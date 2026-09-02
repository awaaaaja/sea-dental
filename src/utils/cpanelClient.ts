 // ponytail: shim supabase-js -> fetch to PHP CMS API (sead2924_cms)
const API_URL = import.meta.env.VITE_API_URL || 'https://seadentalaesthetics.id/cms_api';

function buildUrl(table: string, filters: Record<string, any>, opts: {order?:string, limit?:number, single?:boolean}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k,v])=>{
    // handle neq: key ends with _neq
    if(k.endsWith('_neq')) params.set(k.replace('_neq','')+'_neq', String(v));
    else params.set(k, String(v));
  });
  if(opts.order) params.set('order', opts.order);
  if(opts.limit) params.set('limit', String(opts.limit));
  // single is handled by expecting one row, not via API param
  const qs = params.toString();
  // support path slug: if filters.slug exists and single, use /table/slug
  if(opts.single && filters.slug) {
    return `${API_URL}/${table}/${encodeURIComponent(filters.slug)}`;
  }
  if(opts.single && filters.id) {
    return `${API_URL}/${table}/${encodeURIComponent(filters.id)}`;
  }
  return `${API_URL}/${table}${qs ? '?'+qs : ''}`;
}

class QueryBuilder {
  table: string;
  filters: Record<string,any> = {};
  neqFilters: Record<string,any> = {};
  orderCol?: string;
  limitNum?: number;
  isSingle = false;
  isDelete = false;
  isUpdate: any = null;
  isInsert: any = null;
  isUpsert: any = null;

  constructor(table:string){ this.table=table; }

  select(_cols?:string){ return this; }
  eq(col:string, val:any){ this.filters[col]=val; return this; }
  neq(col:string, val:any){ this.filters[col+'_neq']=val; return this; }
  order(col:string, opts?:{ascending?:boolean}){
    this.orderCol = col + (opts?.ascending===false ? '.desc' : '');
    return this;
  }
  limit(n:number){ this.limitNum=n; return this; }
  single(){ this.isSingle=true; return this; }
  // admin writes
  insert(payload:any){
    this.isInsert=payload;
    return this as any;
  }
  update(payload:any){
    this.isUpdate=payload;
    return this;
  }
  delete(){
    this.isDelete=true;
    return this;
  }
  upsert(payload:any, _opts?:any){
    this.isUpsert=payload;
    // upsert via POST with special header
    return this as any;
  }

  // Make thenable so `await builder` works and returns {data, error}
  then(resolve:(v:any)=>any, reject:(e:any)=>any){
    this.execute().then(resolve, reject);
    // Return dummy to satisfy Promise interface
    return { then: this.then.bind(this), catch: (cb:any)=> this.execute().catch(cb) } as any;
  }
  catch(reject:(e:any)=>any){ return this.execute().catch(reject); }

  async execute(): Promise<{data:any, error:any}>{
    const token = localStorage.getItem('cms_token');
    const headers: Record<string,string> = { 'Content-Type':'application/json' };
    if(token) headers['Authorization']=`Bearer ${token}`;

    // INSERT
    if(this.isInsert){
      const res = await fetch(`${API_URL}/${this.table}`, {method:'POST', headers, body: JSON.stringify(this.isInsert)});
      const j = await res.json().catch(()=>({}));
      if(!res.ok) return {data:null, error: j.error || j};
      return {data: j.data || j, error: null};
    }
    // UPSERT
    if(this.isUpsert){
      const res = await fetch(`${API_URL}/${this.table}`, {method:'POST', headers: {...headers, 'X-Upsert':'true'}, body: JSON.stringify(this.isUpsert)});
      const j = await res.json().catch(()=>({}));
      if(!res.ok) return {data:null, error: j.error || j};
      return {data: j.data || j, error: null};
    }
    // UPDATE (needs eq filter for id)
    if(this.isUpdate){
      const id = this.filters['id'] || this.filters['slug'];
      if(!id) return {data:null, error:{message:'Missing id for update'}};
      const res = await fetch(`${API_URL}/${this.table}/${encodeURIComponent(id)}`, {method:'PUT', headers, body: JSON.stringify(this.isUpdate)});
      const j = await res.json().catch(()=>({}));
      if(!res.ok) return {data:null, error: j.error || j};
      return {data: j.data || j, error: null};
    }
    // DELETE
    if(this.isDelete){
      const id = this.filters['id'] || this.filters['slug'];
      if(!id) return {data:null, error:{message:'Missing id for delete'}};
      const res = await fetch(`${API_URL}/${this.table}/${encodeURIComponent(id)}`, {method:'DELETE', headers});
      const j = await res.json().catch(()=>({}));
      if(!res.ok) return {data:null, error: j.error || j};
      return {data: j.data || j, error: null};
    }

    // SELECT
    // handle neq via post-filtering client side if API doesn't support _neq
    const hasNeq = Object.keys(this.filters).some(k=>k.endsWith('_neq'));
    let fetchFilters = {...this.filters};
    let neqFilters: Record<string,any> = {};
    if(hasNeq){
      Object.keys(fetchFilters).forEach(k=>{
        if(k.endsWith('_neq')){ neqFilters[k.replace('_neq','')]=fetchFilters[k]; delete fetchFilters[k]; }
      });
    }
    const url = buildUrl(this.table, fetchFilters, {order: this.orderCol, limit: this.limitNum, single: this.isSingle});
    const res = await fetch(url, {headers});
    const j = await res.json().catch(()=>({}));
    if(!res.ok){
      return {data: null, error: j.error || {message: 'Fetch failed'}};
    }
    let data = j.data !== undefined ? j.data : j;
    // client-side neq filter
    if(Object.keys(neqFilters).length && Array.isArray(data)){
      data = data.filter((row:any)=> Object.entries(neqFilters).every(([k,v])=> String(row[k])!==String(v)));
      if(this.limitNum) data = data.slice(0, this.limitNum);
    }
    // handle single vs array
    if(this.isSingle){
      if(Array.isArray(data)) data = data[0] ?? null;
      // supabase single returns object, not array
      return {data: data || null, error: data ? null : {message:'Not found'}};
    }
    if(!Array.isArray(data) && data) data=[data];
    return {data: data || [], error: null};
  }
}

// Storage shim
const storageShim = {
  from: (bucket:string)=>({
    upload: async (path:string, file:File)=>{
      const token=localStorage.getItem('cms_token');
      const fd=new FormData();
      fd.append('file', file);
      fd.append('path', path);
      fd.append('bucket', bucket);
      const res=await fetch(`${API_URL}/upload`, {method:'POST', headers: token?{Authorization:`Bearer ${token}`}:{}, body: fd});
      const j=await res.json().catch(()=>({}));
      if(!res.ok) return {data:null, error: j.error || j};
      return {data: j.data || j, error: null};
    },
    getPublicUrl: (path:string)=>{
      // ponytail: assume uploads are at /cms_api/uploads/<bucket>/<path>
      const url=`https://seadentalaesthetics.id/cms_api/uploads/${bucket}/${path}`;
      return {data: {publicUrl: url}};
    }
  })
};

// Auth shim
const authShim = {
  signInWithPassword: async ({email,password}:{email:string,password:string})=>{
    const res=await fetch(`${API_URL}/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})});
    const j=await res.json().catch(()=>({}));
    if(!res.ok) return {data:null, error:{message: j.error?.message || 'Login failed'}};
    const token=j.data?.session?.access_token;
    if(token) localStorage.setItem('cms_token', token);
    if(j.data?.user) localStorage.setItem('cms_user', JSON.stringify(j.data.user));
    return {data: j.data, error: null};
  },
  signOut: async ()=>{
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    await fetch(`${API_URL}/auth/logout`, {method:'POST'}).catch(()=>{});
    return {error:null};
  },
  getSession: async ()=>{
    const token=localStorage.getItem('cms_token');
    if(!token) return {data:{session:null}, error:null};
    const res=await fetch(`${API_URL}/auth/me`, {headers:{Authorization:`Bearer ${token}`}});
    if(!res.ok){
      localStorage.removeItem('cms_token');
      return {data:{session:null}, error:null};
    }
    const j=await res.json();
    const user=j.data;
    if(!user) return {data:{session:null}, error:null};
    return {data:{session:{user:{id:user.id, email:user.email}, access_token:token}}, error:null};
  },
  onAuthStateChange: (cb:(event:string, session:any)=>void)=>{
    // ponytail: minimal - call once with current session
    authShim.getSession().then(({data})=> cb(data.session?'SIGNED_IN':'SIGNED_OUT', data.session));
    return {data:{subscription:{unsubscribe:()=>{}}}};
  },
  resetPasswordForEmail: async (_email:string, _opts:any)=>{
    // ponytail: not implemented for cPanel, return success to avoid breaking UI
    console.warn('resetPassword not implemented for cPanel');
    return {error:null};
  }
};

export function createCpanelClient(){
  return {
    from: (table:string)=> new QueryBuilder(table),
    storage: storageShim,
    auth: authShim,
  };
}

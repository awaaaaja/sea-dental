<script setup lang="ts">
interface Props {
  label?: string
  modelValue?: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'w-full px-4 py-3 rounded-lg border bg-transparent text-on-surface placeholder:text-outline',
        'focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20',
        'transition-all duration-200',
        error ? 'border-error' : 'border-outline-variant',
        disabled && 'opacity-50 cursor-not-allowed',
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="text-sm text-error">{{ error }}</p>
  </div>
</template>

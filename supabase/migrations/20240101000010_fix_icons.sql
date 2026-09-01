-- Fix invalid Material Symbols icons
UPDATE services SET icon = 'healing' WHERE icon = 'gum';
UPDATE services SET icon = 'content_cut' WHERE icon = 'surgery';

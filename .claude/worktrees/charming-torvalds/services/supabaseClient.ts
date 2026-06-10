
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
}

// Fallback to empty string to prevent initial crash, but log error
const url = supabaseUrl || '';
const key = supabaseAnonKey || '';

if (!url || !key) {
    console.error('CRITICAL: Missing Supabase environment variables. App will not function correctly.');
}

export const supabase = createClient(url, key);

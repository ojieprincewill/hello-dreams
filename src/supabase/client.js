import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vpwzqxrkyawljqrrvolj.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Validate environment variables
if (!supabaseKey) {
  console.error('VITE_SUPABASE_KEY is not defined in environment variables');
  throw new Error('Supabase key is required. Please check your environment variables.');
}

if (!supabaseUrl) {
  console.error('Supabase URL is not defined');
  throw new Error('Supabase URL is required. Please check your configuration.');
}

// Create client with realtime configuration
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'hello-dreams-admin'
    }
  }
})

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.warn('Supabase connection test failed:', error.message);
  } else {
    console.log('Supabase client initialized successfully');
  }
}).catch(error => {
  console.warn('Supabase connection test error:', error.message);
});

export default supabase;

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vpwzqxrkyawljqrrvolj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwd3pxeHJreWF3bGpxcnJ2b2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTgxNTAsImV4cCI6MjA2MzQ3NDE1MH0.AYfwWBy1KCTaWKiXBFlKxx76-SONXulKUFCcbF7Q0-E'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_Supbase_url
const supabaseKey = process.env.NEXT_PUBLIC_SupaBase_Secret
export const supabase = createClient(supabaseUrl, supabaseKey)

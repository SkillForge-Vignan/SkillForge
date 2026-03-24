import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://gjzvgdeesvayubzzopei.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Create a client with the ANON key (to test RLS)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testRlsAccess() {
  console.log('--- TESTING RLS ACCESS WITH ANON KEY ---');

  // Sign in as Admin
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'hariharshahello@gmail.com',
    password: 'honey@26H'
  });

  if (authError) {
    console.error('  -> Auth Error:', authError.message);
    return;
  }

  const userId = authData.user.id;
  console.log(`  -> Signed in as Admin. UID: ${userId}`);

  // Try to fetch profile (this was failing with 500)
  console.log(`  -> Fetching profile for UID: ${userId}...`);
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.error('  -> Profile Fetch Error (Check RLS):', profileError.message);
    console.error('  -> Full Error Object:', JSON.stringify(profileError, null, 2));
  } else {
    console.log('  -> Profile Fetch SUCCESS!');
    console.log(`  -> Role: ${profile.role}`);
  }

  // Sign out
  await supabase.auth.signOut();
}

testRlsAccess();

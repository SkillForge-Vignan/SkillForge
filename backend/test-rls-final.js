import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://gjzvgdeesvayubzzopei.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAllRoles() {
  const users = [
    { email: 'hariharshahello@gmail.com', password: 'honey@26H', role: 'admin' },
    { email: 'hariharshahello56@gmail.com', password: 'viit1234', role: 'mentor' },
    { email: '25L35A4416@gmail.com', password: 'mvhs1234', role: 'student' }
  ];

  console.log('--- TESTING RLS FOR ALL ROLES ---');

  for (const u of users) {
    console.log(`\nAccount: ${u.email} (${u.role})`);
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: u.email,
      password: u.password
    });

    if (authError) {
      console.error('  -> Sign In Error:', authError.message);
      continue;
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('  -> Profile Fetch Error:', profileError.message);
    } else {
      console.log(`  -> SUCCESS! Database Role Verification: [${profile.role}]`);
    }

    await supabase.auth.signOut();
  }
}

testAllRoles();

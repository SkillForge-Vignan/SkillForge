import { supabaseAdmin } from './config/supabase.js';

async function verifyUsers() {
  const emails = [
    '25L35A4416@gmail.com',
    'hariharshahello56@gmail.com',
    'hariharshahello@gmail.com'
  ];

  console.log('--- VERIFYING USER ROLES IN DATABASE ---');

  for (const email of emails) {
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    const user = userData.users.find(u => u.email === email);

    if (user) {
      console.log(`Email: ${email}`);
      console.log(`  Auth UID: ${user.id}`);
      console.log(`  Auth Meta Role: ${user.user_metadata.role}`);
      
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profileError) {
        console.error(`  Profile Error: ${profileError.message}`);
      } else {
        console.log(`  Public DB Role: ${profile.role}`);
      }
    } else {
      console.log(`Email: ${email} -> NOT FOUND in Auth.`);
    }
  }
}

verifyUsers();

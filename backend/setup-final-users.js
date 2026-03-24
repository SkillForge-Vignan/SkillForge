import { supabaseAdmin } from './config/supabase.js';

async function setupTestUsers() {
  const usersToCreate = [
    {
      email: '25L35A4416@gmail.com',
      password: 'mvhs1234',
      name: 'Hari Harsha Ummidi',
      role: 'student'
    },
    {
      email: 'hariharshahello56@gmail.com',
      password: 'viit1234',
      name: 'Divya Kalyani',
      role: 'mentor'
    },
    {
      email: 'hariharshahello@gmail.com',
      password: 'honey@26H',
      name: 'Hari Harsha',
      role: 'admin'
    }
  ];

  console.log('--- SETTING UP AUTH ACCOUNTS VIA ADMIN API ---');

  for (const user of usersToCreate) {
    console.log(`Processing: ${user.email} (${user.role})...`);

    // Using admin.createUser to bypass email confirmation and rate limits
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { 
        name: user.name, 
        role: user.role 
      }
    });

    if (createError) {
      if (createError.message.includes('already exists')) {
        console.log(`  -> User already exists. Updating role/meta for ${user.email}...`);
        
        // Find user ID first
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = listData.users.find(u => u.email === user.email);
        
        if (existingUser) {
          const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
            existingUser.id,
            { 
              password: user.password,
              user_metadata: { name: user.name, role: user.role } 
            }
          );
          if (updateError) console.error(`  -> Update error: ${updateError.message}`);
          else console.log(`  -> Updated successfully.`);
        }
      } else {
        console.error(`  -> Error: ${createError.message}`);
      }
    } else {
      console.log(`  -> Created successfully! UID: ${userData.user.id}`);
    }
  }
  
  console.log('\n--- SETUP COMPLETE. READY FOR BROWSER TESTING. ---');
}

setupTestUsers();

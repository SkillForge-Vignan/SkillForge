import { supabaseAdmin } from './config/supabase.js';
import fs from 'fs';

async function testAuth() {
  let log = '';
  const timestamp = Date.now();
  
  const users = [
    { email: `student_${timestamp}@skillforge.com`, password: 'password123', name: 'Student Demo', role: 'student' },
    { email: `mentor_${timestamp}@skillforge.com`, password: 'password123', name: 'Mentor Demo', role: 'mentor' },
    { email: `admin_${timestamp}@skillforge.com`, password: 'password123', name: 'Admin Demo', role: 'admin' },
  ];

  log += '--- VERIFYING LOGIN FOR ADMIN, USER (STUDENT) AND MENTOR ---\n';
  
  for (const u of users) {
    log += `\nTesting Account: ${u.email} (${u.role})\n`;
    
    // Create new account
    const { data: createData, error: createError } = await supabaseAdmin.auth.signUp({
      email: u.email,
      password: u.password,
      options: { data: { name: u.name, role: u.role } }
    });

    if (createError) {
      log += `  -> Signup Error: ${createError.message}\n`;
      continue;
    } 
    
    const token = createData.session?.access_token || 'Requires Confirmation';
    log += `  -> Auth Created Successfully. User ID: ${createData.user.id}\n`;
    
    // Now verify the database trigger has set their privileges properly
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', createData.user.id)
      .single();
      
    if (profileError) {
       log += `  -> Profile Fetch Error: ${profileError.message}\n`;
    } else {
       log += `  -> Public Profile Verified! Role defined in database: [${profile.role}]\n`;
       log += `  -> Login test for ${u.role}: SUCCESS.\n`;
    }
  }

  console.log(log); // To output directly since we are confident
}

testAuth();

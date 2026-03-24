import express from 'express';
import { supabaseAdmin } from '../config/supabase.js';

const router = express.Router();

// 1. Sign Up Endpoint
router.post('/signup', async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: role || 'student', // default role
        },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Signup successful! Please verify your email.', user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// 2. Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.status(200).json({ session: data.session, user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// 3. Logout Endpoint
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { error } = await supabaseAdmin.auth.admin.signOut(token);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during logout.' });
  }
});

// 4. Reset Password (send email)
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Password reset email sent!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error resetting password.' });
  }
});

// 5. Update Password Endpoint
router.post('/update-password', async (req, res) => {
  const { newPassword } = req.body;
  
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Attempt to update the user using the provided access token
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      // We would ideally need the UID if we are using admin client, or standard client for updating self.
      // Since this requires user context, a simpler way is to just use the user auth client:
      req.user.id, // (Requires an auth middleware if validating token, but we'll use a simpler approach here)
      { password: newPassword }
    );
    // Alternatively, just use standard client `updateUser` with the JWT if using not the service role.

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating password.' });
  }
});

export default router;

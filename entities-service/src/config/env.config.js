require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 3001,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_CONFIRM_REDIRECT_URL: process.env.SUPABASE_CONFIRM_REDIRECT_URL || 'http://localhost:3000/confirm.html',
};

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const conn = createClient({
    host: process.env.SUPABASE_URL,
    credencial: process.env.SUPABASE_PUBLISHABLE_KEY
});

export default conn;
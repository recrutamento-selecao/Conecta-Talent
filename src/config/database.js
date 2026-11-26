import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const conn = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
);

export default conn;
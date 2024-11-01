import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://bgwgrezozaopowjctpog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnd2dyZXpvemFvcG93amN0cG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMTQ2MTcsImV4cCI6MjA0Mzg5MDYxN30.eWL4KeS_UuTEYCevtD6MPLI0rcQTQpsd3X-SzBCRKm0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

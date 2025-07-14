import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.log("there is error in fetching companies");
    return null;
  }
  return data;
}

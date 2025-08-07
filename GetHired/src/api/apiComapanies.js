import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function fetchCompanies(authToken) {
  const client = await supabaseClient(authToken);

  const { data, error } = await client.from("companies").select("*");

  if (error) {
    console.error("Unable to fetch companies:", error);
    return null;
  }

  return data;
}

export async function addNewCompany(authToken, _, companyDetails) {
  const client = await supabaseClient(authToken);

  const uniqueSuffix = Math.floor(Math.random() * 80000);
  const logoFileName = `logo-${uniqueSuffix}-${companyDetails.name}`;

  const { error: uploadIssue } = await client.storage
    .from("company-logo")
    .upload(logoFileName, companyDetails.logo);

  if (uploadIssue) {
    console.error("Logo upload failed:", uploadIssue);
    return null;
  }

  const logoLink = `${supabaseUrl}/storage/v1/object/public/company-logo/${logoFileName}`;

  const { data, error } = await client
    .from("companies")
    .insert([{ name: companyDetails.name, logo_url: logoLink }])
    .select();

  if (error) {
    console.error("Failed to add new company:", error);
    return null;
  }

  return data;
}

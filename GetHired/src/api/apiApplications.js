import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function submitJobApplication(authToken, _, applicationInfo) {
  const client = await supabaseClient(authToken);

  const uniqueNumber = Math.floor(Math.random() * 80000);
  const resumeFile = `resume-${uniqueNumber}-${applicationInfo.candidate_id}`;

  const { error: uploadError } = await client.storage
    .from("resumes")
    .upload(resumeFile, applicationInfo.resume);

  if (uploadError) {
    console.error("Resume upload failed:", uploadError);
    return null;
  }

  const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${resumeFile}`;

  const { data, error } = await client
    .from("applications")
    .insert([{ ...applicationInfo, resume: resumeUrl }])
    .select();

  if (error) {
    console.error("Failed to submit job application:", error);
    return null;
  }

  return data;
}

export async function updateApplicationStatus(authToken, { job_id }, newStatus) {
  const client = await supabaseClient(authToken);

  const query = await client
    .from("applications")
    .update({ status: newStatus })
    .eq("job_id", job_id)
    .select();

  if (query.error || !query.data || query.data.length === 0) {
    console.error("Could not update application status:", query.error);
    return null;
  }

  return query.data;
}


export async function fetchUserApplications(authToken, { user_id }) {
  const client = await supabaseClient(authToken);

  const query = await client
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (query.error) {
    console.error("Error while retrieving user applications:", query.error);
    return null;
  }

  return query.data;
}





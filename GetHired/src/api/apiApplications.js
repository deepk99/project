import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000); 
  console.log(random);

  const fileName = `resume-${random}-${jobData.candidate_id}`;
  console.log(fileName);

  console.log(jobData);
  console.log("Job Data Before Upload:", jobData);
  console.log("Resume File:", jobData.resume);
  console.log("Resume File Type:", jobData.resume?.type);

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error in uploading resume", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  console.log(resume);

  const { data, error } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select();

  if (error) {
    console.error("Error in submitting resume", error);
    return null;
  }
  return data;
}


export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();
  console.log(status);

  const { data, error } = await query;
  if (error || data.length === 0) {
    console.log("there is error in updateing apllication status", error);
    return null;
  }
  return data;
}


export async function GetMyApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("applications")
    .select("*,job:jobs(title,company:companies(name))")
    .eq("candidate_id", user_id);

  const { data, error } = await query;
  if (error) {
    console.log("there is error in fetching applications", error);
    return null;
  }
  return data;
}




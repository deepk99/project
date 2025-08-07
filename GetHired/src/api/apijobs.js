import supabaseClient from "@/utils/supabase";

import initializeSupabase from "@/utils/supabase";

export const fetchJobListings = async (
  authToken,
  { location, company_id, searchQuery }
) => {
  const db = await initializeSupabase(authToken);

  let jobQuery = db
    .from("jobs")
    .select("*, company:companies(name, logo_url), saved:saved_jobs(id)");

  if (location) {
    jobQuery = jobQuery.eq("location", location);
  }

  if (company_id) {
    jobQuery = jobQuery.eq("company_id", company_id);
  }

  if (searchQuery) {
    jobQuery = jobQuery.ilike("title", `%${searchQuery}`);
  }

  const { data, error } = await jobQuery;

  if (error) {
    console.error("Error fetching jobs:", error.message);
    return [];
  }

  return data || [];
};

export async function fetchJobDetails(authToken, { job_id }) {
  const db = await supabaseClient(authToken);

  const response = await db
    .from("jobs")
    .select(
      "*, company:companies(name, logo_url), applications:applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (response.error) {
    console.error("Failed to retrieve job details:", response.error);
    return null;
  }

  return response.data;
}

export async function updateHiringStatus(authToken, { job_id }, isOpen) {
  const db = await supabaseClient(authToken);

  const hiring = await db
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (hiring.error) {
    console.error("Error updating hiring status:", hiring.error);
    return null;
  }

  return response.data;
}

export async function saveJob(authToken, { alreadySaved }, jobData) {
  const db = await supabaseClient(authToken);

  if (alreadySaved) {
    const remove = await db
      .from("saved_jobs")
      .delete()
      .eq("job_id", jobData.job_id);

    if (remove.error) {
      console.error("Unable to remove saved job:", remove.error);
      return null;
    }

    return remove.data;
  } else {
    const save = await db.from("saved_jobs").insert([jobData]).select();

    if (save.error) {
      console.error("Failed to save job:", save.error);
      return null;
    }

    return save.data;
  }
}

export async function GetSavedJobs(authToken) {
  const db = await supabaseClient(authToken);

  const query = await db
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name, logo_url))");

  if (query.error) {
    console.error("Error fetching saved jobs:", query.error);
    return null;
  }

  return query.data;
}

export async function GetMyCreatedJobs(authToken, { recruiter_id }) {
  const db = await supabaseClient(authToken);

  const query = await db
    .from("jobs")
    .select("*, company:companies(name, logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (query.error) {
    console.error("Unable to fetch recruiter jobs:", query.error);
    return null;
  }

  return query.data;
}

export async function addNewJob(authToken, _, jobDetails) {
  const db = await supabaseClient(authToken);

  const query = await db.from("jobs").insert([jobDetails]).select();

  if (query.error) {
    console.error("Job creation failed:", query.error);
    return null;
  }

  return query.data;
}
export async function DeleteMyJob(authToken, { job_id }) {
  const db = await supabaseClient(authToken);

  const query = await db.from("jobs").delete().eq("id", job_id).select();

  if (query.error) {
    console.error("Failed to delete job:", query.error);
    return null;
  }

  return query.data;
}

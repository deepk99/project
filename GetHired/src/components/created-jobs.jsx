import { GetMyCreatedJobs } from "@/api/apijobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

function CreatedJobs() {
  const { user, isLoaded } = useUser();
  const {
    loading: isJobsLoading,
    data: jobsPosted,
    fn: fetchJobs,
  } = useFetch(GetMyCreatedJobs, {
    recruiter_id: user?.id,
  });
  console.log(user);

  useEffect(() => {
    fetchJobs();
  }, []);

  if (isJobsLoading) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }
  return (
    <section className="py-10 px-4">
      {jobsPosted?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {jobsPosted.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onJobSaved={fetchJobs}
              isMyJob
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 font-semibold mt-10">
          No job postings available.
        </div>
      )}
    </section>
  );
}

export default CreatedJobs;

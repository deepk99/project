import { GetMyCreatedJobs } from "@/api/apijobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

function CreatedJobs() {
  const { user, isLoaded } = useUser();
  const {
    loading: isLoadingJobs,
    data: postedJobs,
    fn: fetchPostedJobs,
  } = useFetch(GetMyCreatedJobs, {
    recruiter_id: user.id,
  });
  console.log(user);

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  if (isLoadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }
  return (
    <section className="pt-10 px-2">
      {postedJobs?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-6">
          {postedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onJobSaved={fetchPostedJobs}
              isMyJob
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 font-medium py-8">
          You haven't posted any jobs yet.
        </div>
      )}
    </section>
  );
}

export default CreatedJobs;

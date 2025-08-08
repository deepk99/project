import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Bookmark, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { DeleteMyJob, saveJob } from "@/api/apijobs";

function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) {
  const [isSaved, setIsSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, {
    alreadySaved: isSaved,
  });
  const { user } = useUser();
  console.log(job);

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setIsSaved(savedJob?.length > 0);
  }, [savedJob]);

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(DeleteMyJob, {
    job_id: job.id,
  });

  const handleDeleteJOb = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-all flex flex-col">
      {loadingDeleteJob && (
        <BarLoader className="mb-4" width={"100%"} color="blue" />
      )}
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg font-semibol">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              size={18}
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={handleDeleteJOb}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-grow">
        <div className="flex justify-between items-center">
          {job.company && (
            <img src={job.company.logo_url} className="h-6 w-auto" alt="" />
          )}
          <div className="flex items-center text-sm gap-1 text-gray-300">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>

        <div className="border-t pt-2 text-sm text-gray-300">
          {job.description?.split(".")[0]}.
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between items-center gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button className="w-full" variant="secondary">
            View Job
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            onClick={handleSaveJob}
            className="p-2"
            disabled={loadingSavedJobs}
          >
            {isSaved ? (
              <Bookmark size={20} stroke="red" fill="red" />
            ) : (
              <Bookmark size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;

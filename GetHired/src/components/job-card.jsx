import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { saveJob } from "@/api/apijobs";

function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) {
  const [saved, setsaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, {
    alreadySaved: saved,
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
    if (savedJob !== undefined) setsaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img src={job.company.logo_url} className="h-6" alt="" />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}.
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            onClick={handleSaveJob}
            className="w-15"
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;

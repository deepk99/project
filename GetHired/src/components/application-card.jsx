import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { updateApplicationStatus } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function ApplicationCard({ application, isApplicant = false }) {
  const downloadResume = () => {
    const resumelink = document.createElement("a");
    resumelink.href = application?.resume;
    resumelink.target = "_blank";
    resumelink.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  console.log("Application Data:", application);

  const onStatusChange = (value) => {
    fnHiringStatus(value);
  };

  return (
    <Card className="flex flex-col shadow-md transition-all">
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="blue" />
      )}
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center text-lg font-semibold">
          {isApplicant
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}

          <Download
            size={20}
            className="cursor-pointer bg-white text-black rounded-full p-1.5 h-8 w-8 hover:shadow"
            onClick={downloadResume}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between gap- ">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <BriefcaseBusiness />
            <span>{application?.experience} yrs experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <School />
            {application?.education}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Boxes />
            Skills: {application?.skills}
          </div>
        </div>
        <hr className="border-gray-300" />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
        <span className="text-gray-300">
          Applied on: {new Date(application?.created_at).toLocaleString()}
        </span>
        {isApplicant ? (
          <span className="font-semibold capitalize">
            Status: {application?.status}
          </span>
        ) : (
          <Select
            onValueChange={onStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}

export default ApplicationCard;

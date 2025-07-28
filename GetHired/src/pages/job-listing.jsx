import { getCompanies } from "@/api/apiComapanies";
import { getJobs } from "@/api/apijobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function JobListing() {
  const [searchQuery, setsearchQuery] = useState("");
  const [location, setlocation] = useState("");
  const [company_id, setcompany_id] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  console.log(companies);
  console.log("Hello");

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);
  console.log(Jobs);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");

    if (query) setsearchQuery(query);
  };

  const handleClearButton = () => {
    setsearchQuery("");
    setcompany_id("");
    setlocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 ">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-12 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        ></Input>
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setlocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            <SelectGroup>
              {State.getStatesOfCountry("GB").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setcompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="destructive"
          className="sm:w-1/2"
          onClick={handleClearButton}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="blue" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Jobs?.length ? (
            Jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default JobListing;

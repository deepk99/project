import { fetchCompanies } from "@/api/apiComapanies";
import { fetchJobListings } from "@/api/apijobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function JobListing() {
  const { isLoaded } = useUser();
  const [searchQuery, setsearchQuery] = useState("");
  const [location, setlocation] = useState("");
  const [company_id, setcompany_id] = useState("");

  const {
    fn: loadJobs,
    data: Jobs,
    loading: jobLoading,
  } = useFetch(fetchJobListings, {
    location,
    company_id,
  });

  const { fn: loadComanies, data: companies } = useFetch(fetchCompanies);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");

    if (query) setsearchQuery(query);
  };

  const filteredJobs = searchQuery
    ? Jobs?.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Jobs;

  useEffect(() => {
    if (isLoaded) {
      loadComanies();
      loadJobs();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      loadJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  console.log(Jobs);

  const handleReset = () => {
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
        Discover New Job Opportunities
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-12 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Type a job title to search..."
          name="job-search"
          className="h-full flex-1 px-4 text-md"
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
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
          onClick={handleReset}
        >
          Clear Filters
        </Button>
      </div>

      {jobLoading && <BarLoader className="mb-4" width={"100%"} color="blue" />}

      {jobLoading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs?.length ? (
            filteredJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No matching jobs available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default JobListing;

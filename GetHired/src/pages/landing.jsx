import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faq from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function LandingPage() {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 ">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Search Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img
              src="/getHired.png"
              alt="Hired Logo"
              className="h-12 sm:h-24 lg:h-28"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings from top companies or find the
          perfect candidate for your team.
        </p>
      </section>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/jobs">
          <button className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg">
            Find Jobs
          </button>
        </Link>
        <Link to="/post-job">
          <button className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-lg">
            Post a Job
          </button>
        </Link>
      </div>

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10 -z-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full max-w-7xl aspect-[16/6] overflow-hidden rounded-xl mx-auto shadow-lg">
        <img
          src="/banner3.jpg"
          className="w-full h-full object-cover"
          alt="Banner"
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            For Job Seekers
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Search and apply for jobs, track applications, and get discovered by
            top employers.
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            For Employers
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Post jobs, manage applications, and find the best candidates for
            your open roles.
          </p>
        </div>
      </section>

      <Accordion type="single" collapsible>
        {faq.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}

export default LandingPage






GetHired – Job Portal

GetHired is a full-stack job portal web application built for MSc Computer Science dissertation.
The repository includes the full React application code, excluding any sensitive environment variables. It includes a package.json file which lists all the dependencies required to run the system. A .gitignore file is used to exclude sensitive files (like the .env file) and build artifacts, and a README.md provides an overview of the project.

To run the software locally, set up a development environment by following these steps:

Fork and clone the repository to your local machine.

Install all the required dependencies by running the command npm install in the project's root directory.

Create a .env file in the root directory and define all necessary environment variables. This will require creating free accounts on the following platforms:

Clerk: For the VITE_CLERK_PUBLISHABLE_KEY.

Supabase: For the VITE_SUPABASE_URL and VITE_SUPABASE_KEY.

Once the dependencies are installed and the environment variables are defined, run the development server using the command npm run dev.

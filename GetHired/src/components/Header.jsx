import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";


const Header = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (searchParams.get("sign-in")) {
      setIsSignInVisible(true);
    }
  }, [searchParams]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsSignInVisible(false);
      setSearchParams({});
    }
  };
  return (
    <>
      <header className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/Hired.png" alt="" className="h-22 w-24" />
        </Link>

        <div className="flex items-center gap-8">
          <SignedOut>
            <Button varient="outline" onClick={() => setIsSignInVisible(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </header>

      {isSignInVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55"
          onClick={handleBackdropClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
}

export default Header;

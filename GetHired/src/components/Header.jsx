import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (queryParams.get("sign-in")) {
      setShowSignInModal(true);
    }
  }, [queryParams]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowSignInModal(false);
      setQueryParams({});
    }
  };
  return (
    <>
      <header className="py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/Hired.png" alt="" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-8">
          <SignedOut>
            <Button varient="outline" onClick={() => setShowSignInModal(true)}>
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="secondary"
                  className="flex items-center gap-2 rounded-md"
                >
                  <PenBox size={18} />
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

      {showSignInModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
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
};

export default Header;

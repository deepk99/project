
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthRedirect = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    if (
      isLoaded &&
      isSignedIn &&
      !user?.unsafeMetadata?.role &&
      location.pathname !== "/onboarding"
    ) {
      navigate("/onboarding");
    }
  }, [isSignedIn, isLoaded, user, location, navigate]);

  return null;
};

export default AuthRedirect;

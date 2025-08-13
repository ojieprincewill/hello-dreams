import React from "react";
import { useAuth } from "@/hooks/useAuth"; // Update this path
import Preview1 from "./preview1.component";
import Preview2 from "./preview2.component";
import Preview3 from "./preview3.component";
import Preview4 from "./preview4.component";
import JoinCohort from "./join-cohort.component";

const LandingPreviews = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="px-[5%] py-15">
      <Preview1 user={user} isAuthenticated={isAuthenticated} />
      <Preview2 user={user} isAuthenticated={isAuthenticated} />
      <Preview3 user={user} isAuthenticated={isAuthenticated} />
      <JoinCohort />
      <Preview4 user={user} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default LandingPreviews;
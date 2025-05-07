import React from "react";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
      Logo
    </Link>
  );
};

export default Logo;

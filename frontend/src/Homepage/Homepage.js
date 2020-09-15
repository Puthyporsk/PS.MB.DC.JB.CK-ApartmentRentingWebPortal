import React, { useState } from "react";
import { Redirect } from "react-router";

const Homepage = () => {
  const [logout, setLogout] = useState(false);

  return (
    <div>
      {logout && <Redirect to="/login" />}
      <button onClick={() => setLogout(true)}>Back</button>
      <h1>Homepage</h1>
    </div>
  );
};

export default Homepage;

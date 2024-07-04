import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const usenavigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === " " || username === null) {
      usenavigate("/login");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username"); // Clear the session storage
    usenavigate("/login"); // Redirect to the login page
  };
  return (
    <div>
      <div className="header">
        <Link className="lin" to={"/"}>
          Home
        </Link>
        {/* <Link style={{ float: "right" }} className="lin" to={"/login"}>
          Logout
        </Link> */}
        <button
          style={{ float: "right" }}
          className="lin"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="text-center">
        <h1>Wlcome to My React Project</h1>
      </div>
    </div>
  );
}


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      alert("You are not logged in!");
      navigate("/login");
      return;
    }

    // Clear localStorage and logout
    localStorage.removeItem("username");
    alert("Logged out successfully!");
    navigate("/");
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging you out...</h2>
    </div>
  );
}

export default Logout;

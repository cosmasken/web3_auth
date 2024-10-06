import React, { useState,useEffect } from "react";
import { useAuth } from "./use-auth-client";

const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
};

function LoggedIn() {
  const [result, setResult] = React.useState("");

  const { whoamiActor, logout } = useAuth();

  

  useEffect(() => {
    const initializeActor = async () => {
      if (!whoamiActor) {
        console.error("Actor is not initialized");
      }
    };
    initializeActor();
  }, [whoamiActor]);
  
  const handleClick = async () => {
    if (whoamiActor) {
      try {
        const whoami = await whoamiActor.whoami();
        setResult(whoami);
      } catch (error) {
        console.error("Error fetching identity:", error);
      }
    } else {
      console.error("whoamiActor is null, unable to fetch identity.");
    }
  };
  
  return (
    <div className="container">
      <h1>Internet Identity Client</h1>
      <h2>You are authenticated!</h2>
      <p>To see how a canister views you, click this button!</p>
      {/* <button
        type="button"
        id="whoamiButton"
        className="primary"
        onClick={handleClick}
      >
        Who am I?
      </button>
      <input
        type="text"
        readOnly
        id="whoami"
        value={result}
        placeholder="your Identity"
        style={whoamiStyles}
      /> */}
      <button id="logout" onClick={logout}>
        log out
      </button>
    </div>
  );
}

export default LoggedIn;

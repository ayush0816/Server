import React, { useState } from "react";

function Form() {
  const port = "http://localhost:8080";
  const [creds, setcreds] = useState({ userId: "", chatName: "" });
  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(creds);
    const response = await fetch(`${port}/api/chat/createChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQzOTA4NGY4MTUyODJjMzI3YWE0MTciLCJpYXQiOjE2OTE1ODY2OTJ9.R0TnG5rLaAmTxSG5nDEsqqRQcjj89fA3kyXHH6bntM4",
      },
      body: JSON.stringify({ userId: creds.userId, chatname: creds.chatName }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div>
      <input
        type="text"
        value={creds.userId}
        name="userId"
        onChange={handleChange}
        placeholder="Input 1"
      />
      <input
        type="text"
        value={creds.chatName}
        name="chatName"
        onChange={handleChange}
        placeholder="Input 2"
      />
      <button onClick={handleSubmit}>Button 1</button>
      <button>Button 2</button>
    </div>
  );
}

export default Form;

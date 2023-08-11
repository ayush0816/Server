import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const LoginForm = () => {
  const port = "http://localhost:8080";
  let navigate = useNavigate();
  const [creds, setcreds] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${port}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();

    if (json.status === "success") {
      navigate("/message");
    }
    console.log(json);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleLogin}>
        <Label>Username</Label>
        <Input
          type="email"
          name="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          value={creds.email}
          onChange={handleChange}
        />

        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          className="form-control"
          id="password"
          value={creds.password}
          onChange={handleChange}
        />

        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

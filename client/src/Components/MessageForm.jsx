import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
`;

const MessageForm = () => {
  const port = "http://localhost:8080";
  const [creds, setcreds] = useState({ UserId: "", message: "" });
  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date();
    const response = await fetch(`${port}/api/chat/addChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: creds.UserId,
        timestamp: timestamp.getDate(),
        message: creds.message,
      }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <FormContainer>
      <Form>
        <Form.Item label="UserId">
          <Input
            type="text"
            name="UserId"
            className="form-control"
            id="userid"
            aria-describedby="emailHelp"
            value={creds.userId}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Message">
          <Input
            type="message"
            name="message"
            className="form-control"
            id="message"
            value={creds.message}
            onChange={handleChange}
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Ask
        </Button>
      </Form>
    </FormContainer>
  );
};

export default MessageForm;

import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function ContactForm() {
  const data = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    company: "",
  };
  const [formData, setFormData] = useState(data);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [message]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.firstName === "" || formData.phoneNumber.length !== 10) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 10000);
      return setMessage("Please enter valid data");
    }
    const res = await fetch("http://localhost:3000/api/addContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMessage(data);
  };
  useEffect(() => {
  },[handleSubmit]);
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "90%" } }}
      noValidate
      autoComplete="off"
    >
      <div className="form">
        <div className="row">
          <TextField
            required
            id="firstName"
            label="First Name"
            onChange={handleChange}
          />
          <TextField id="lastName" label="Last Name" onChange={handleChange} />
        </div>
        <div className="row">
          <TextField id="email" label="Email" onChange={handleChange} />
          <TextField
            required
            id="phoneNumber"
            label="Phone number"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <TextField id="jobTitle" label="Job Title" onChange={handleChange} />
          <TextField id="company" label="Company" onChange={handleChange} />
        </div>
        <div className="button">
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </div>
        {showMessage ? (
          error ? (
            <Button color="red">{message}</Button>
          ) : (
            <Button>{message}</Button>
          )
        ) : null}
      </div>
    </Box>
  );
}

// src/pages/Register.js
import React, { useContext, useState } from "react";
import { Container, Card, TextField, Button, FormControlLabel, Checkbox, Radio, RadioGroup, FormLabel, Select, MenuItem, Input } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { setUsers } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gender: "",
    qualification: "",
    hobbies: [],
    terms: false,
    profileImage: null
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, [name]: file });
    } else {
      setErrors({ ...errors, profileImage: "Only image files are allowed" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email format";
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Phone number must be 10 digits";
    if (!formData.gender) tempErrors.gender = "Please select gender";
    if (!formData.qualification) tempErrors.qualification = "Please select qualification";
    if (!formData.terms) tempErrors.terms = "You must agree to the terms";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUsers((prev) => [...prev, formData]);
      alert("Registration successful! Please login.");
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5">
      <Card className="p-4">
        <h2>Register</h2>
        <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} error={!!errors.name} helperText={errors.name} />
        <TextField name="email" label="Email" fullWidth margin="normal" onChange={handleChange} error={!!errors.email} helperText={errors.email} />
        <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} error={!!errors.password} helperText={errors.password} />
        <TextField name="address" label="Address" multiline rows={3} fullWidth margin="normal" onChange={handleChange} error={!!errors.address} helperText={errors.address} />
        <TextField name="phone" label="Phone Number" type="number" fullWidth margin="normal" onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
        
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup row name="gender" onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        
        <FormLabel component="legend">Qualification</FormLabel>
        <Select name="qualification" fullWidth onChange={handleChange} error={!!errors.qualification}>
          <MenuItem value="highschool">High School</MenuItem>
          <MenuItem value="bachelor">Bachelor's</MenuItem>
          <MenuItem value="master">Master's</MenuItem>
          <MenuItem value="phd">PhD</MenuItem>
        </Select>
        {errors.qualification && <p style={{ color: "red" }}>{errors.qualification}</p>}
        
        <FormLabel component="legend">Profile Image</FormLabel>
        <Input type="file" name="profileImage" fullWidth onChange={handleFileChange} />
        {errors.profileImage && <p style={{ color: "red" }}>{errors.profileImage}</p>}
        
        <FormControlLabel control={<Checkbox name="terms" onChange={handleChange} />} label="Agree to terms" />
        {errors.terms && <p style={{ color: "red" }}>{errors.terms}</p>}
        
        <Button variant="contained" color="primary" className="mt-3" onClick={handleSubmit}>Register</Button>
      </Card>
    </Container>
  );
}

export default Register;

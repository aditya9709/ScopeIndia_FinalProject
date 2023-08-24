import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    hobbies: [],
    picture: null,
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({ ...formData, hobbies: [...formData.hobbies, value] });
      } else {
        setFormData({
          ...formData,
          hobbies: formData.hobbies.filter((hobby) => hobby !== value),
        });
      }
    } else if (type === "file") {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      if (key === "picture") {
        form.append("picture", formData.picture);
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        form
      );
      setMessage("Registration successful. Confirmation email sent.");
    } catch (error) {
      setMessage("Unable to register. Please try again.");
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />

        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />

        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />

        <label>Hobbies:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="reading"
              onChange={handleInputChange}
            />{" "}
            Reading
          </label>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="painting"
              onChange={handleInputChange}
            />{" "}
            Painting
          </label>
        </div>

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <label>Upload Picture:</label>
        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleInputChange}
        />

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Register;

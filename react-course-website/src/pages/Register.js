import React, { useState } from "react";
import axios from "axios";
import "../pages/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    hobbies: [],
    picture: null,
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
      console.log(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        form
      );
      setMessage("Registration successful. Confirmation email sent.");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMessage("Unable to register. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-title">Registration</h1>
      <form
        className="registration-form"
        onSubmit={handleSubmit}
      >
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
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

        <label>Profile Picture:</label>
        <input
          type="file"
          name="picture"
          onChange={handleInputChange}
        />

        <div className="registration-hobbies">
          <label className="hobbies-label">Hobbies:</label>
          <div className="hobbies-checkboxes">
            <label className="hobby-label">
              <input
                type="checkbox"
                name="hobbies"
                value="reading"
                onChange={handleInputChange}
              />{" "}
              Reading
            </label>
            <label className="hobby-label">
              <input
                type="checkbox"
                name="hobbies"
                value="painting"
                onChange={handleInputChange}
              />{" "}
              Painting
            </label>
          </div>
        </div>

        <div className="registration-submit">
          <button
            className="submit-button"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>

      <p className="registration-message">{message}</p>
    </div>
  );
};

export default Register;

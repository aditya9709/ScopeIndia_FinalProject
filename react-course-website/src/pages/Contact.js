import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Send email logic here
      alert("Email sent successfully!");
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.subject) {
      errors.subject = "Subject is required";
    }
    if (!formData.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-details">
        <p>Email: info@scopeindia.org</p>
        <p>Phone: 7592939481 (EKM)</p>
        <p>
          Address: SCOPE INDIA, Vasanth Nagar Rd, near JLN Metro Station,
          Kaloor, Kochi, Ernakulam, Kerala 682025
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={errors.subject ? "error" : ""}
          />
          {errors.subject && (
            <span className="error-message">{errors.subject}</span>
          )}
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className={errors.message ? "error" : ""}
          />
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
          <button type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [picturePreview, setPicturePreview] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const courses = [
    { id: 1, name: "Python", duration: "2 months", fee: "Rs. 30000" },
    { id: 2, name: "Javascript", duration: "3 months", fee: "Rs. 40000" },
    { id: 3, name: "MERN Stack", duration: "4 months", fee: "Rs. 35000" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setUserProfile(response.data.user);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCourseSelection = (courseId) => {
    const selected = courses.find((course) => course.id === Number(courseId));
    setSelectedCourse(selected);
  };

  const handleEdit = () => {
    setEditing(true);
    setUpdatedProfile({ ...userProfile });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setUpdatedProfile({ ...updatedProfile, picture: file });
    setPicturePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const formData = new FormData();
    for (const key in updatedProfile) {
      formData.append(key, updatedProfile[key]);
    }

    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const passwordData = {
      oldPassword,
      newPassword,
    };

    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setUserProfile(updatedProfile);
        setEditing(false);
        setPicturePreview(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    if (!selectedCourse) {
      console.log("Please select a course to sign up.");
      return;
    }

    try {
      const requestData = {
        courseId: selectedCourse.id,
        userId: userProfile.id,
      };

      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        requestData
      );

      if (response.data.success) {
        console.log("Course signed up successfully!");

        setUserProfile({
          ...userProfile,
          selectedCourse: {
            name: selectedCourse.name,
            duration: selectedCourse.duration,
            fee: selectedCourse.fee,
          },
        });
      } else {
        console.log("Failed to sign up for the course.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-content">
          <div className="profile-picture">
            <img
              src={
                picturePreview || `http://localhost:5000/${userProfile.picture}`
              }
              alt="Profile"
            />
            {editing && (
              <input
                type="file"
                name="picture"
                onChange={handlePictureChange}
              />
            )}
          </div>
          <div className="profile-details">
            <p>
              <strong>Username:</strong> {userProfile.username}
            </p>
            <p>
              <strong>Full Name:</strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="fullName"
                  value={updatedProfile.fullName}
                  onChange={handleInputChange}
                />
              ) : (
                userProfile.fullName
              )}
            </p>
            <p>
              <strong>Phone Number:</strong>{" "}
              {editing ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={updatedProfile.phoneNumber}
                  onChange={handleInputChange}
                />
              ) : (
                userProfile.phoneNumber
              )}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {`${userProfile.city}, ${userProfile.state}, ${userProfile.country}`}
            </p>
            {editing && (
              <div>
                <p>
                  <strong>Change Password:</strong>
                </p>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            {editing ? (
              <div className="profile-buttons">
                <button
                  className="save-button"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="edit-button"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      )}

      <div className="course-selection">
        <p>
          <strong>Select a Course:</strong>
        </p>
        <select onChange={(e) => handleCourseSelection(e.target.value)}>
          <option value="">Select a Course</option>
          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.name}
            </option>
          ))}
        </select>
        {selectedCourse && (
          <div>
            <p>
              <strong>Course Name:</strong> {selectedCourse.name}
            </p>
            <p>
              <strong>Duration:</strong> {selectedCourse.duration}
            </p>
            <p>
              <strong>Fee:</strong> {selectedCourse.fee}
            </p>
            <button
              className="sign-up-button"
              onClick={handleSignUp}
            >
              Sign Up for Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

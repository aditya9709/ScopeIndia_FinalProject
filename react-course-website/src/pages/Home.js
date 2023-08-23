import React from "react";
import homeImage from "../images/home-image.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <img
        src={homeImage}
        alt="Home"
        className="home-image"
      />{" "}
      <div className="home-attribution">Image by pressfoto on Freepik</div>
      <div className="home-content">
        <h1>Welcome to Scope India</h1>
        <p>
          {" "}
          Software, Networking, and Cloud Professional Education Centre in
          Kerala from Suffix E Solutions with WORKING PROFESSIONALS oriented
          on-the-job TRAINING model. SCOPE INDIA provides courses for Software
          Programming in Python (Data Science | Artificial Intelligence |
          Machine Learning | Deep Learning), Java, PHP, .Net, Software Testing
          Manual and Automation, Cloud in AWS, Azure, Server Administration in
          MCSE, and RHCE, CCNA, Mobile App Development in Flutter, and, Digital
          Marketing. Training with 100% Trusted Job Based Internship Model.
          SCOPE INDIA has a Strong Placement Cell that provides jobs to 1000's
          of students every year. We assure you, you won't regret it after
          training from SCOPE INDIA! This is how SCOPE INDIA can support both
          newbies and experienced in the industry to upgrade their skills.
        </p>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import aboutImage from "../images/about-image.jpeg";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <img
          src={aboutImage}
          alt="About Us"
          className="about-image"
        />
        <p>
          One of the best Training Destination for Software, Networking and
          Cloud Computing courses in India Software, Networking, and Cloud
          Professional Education Centre in Kerala from Suffix E Solutions with
          WORKING PROFESSIONALS oriented on-the-job TRAINING model. SCOPE INDIA
          provides courses for Software Programming in Python (Data Science |
          Artificial Intelligence | Machine Learning | Deep Learning), Java,
          PHP, .Net, Software Testing Manual and Automation, Cloud in AWS,
          Azure, Server Administration in MCSE, and RHCE, CCNA, Mobile App
          Development in Flutter, and, Digital Marketing. Training with 100%
          Trusted Job Based Internship Model. SCOPE INDIA has a Strong Placement
          Cell that provides jobs to 1000's of students every year. We assure
          you, you won't regret it after training from SCOPE INDIA! This is how
          SCOPE INDIA can support both newbies and experienced in the industry
          to upgrade their skills.
        </p>
      </div>
    </div>
  );
};

export default About;

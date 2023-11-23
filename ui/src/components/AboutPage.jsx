// AboutPage.js
import React from "react";
import "./AboutPage.css";

const contributors = [
  {
    name: "Nitish Nashine",
    contributions: "Full Stack developer",
    email: "103221541@mitwpu.edu.in",
  },
  {
    name: "Paras Raut",
    contributions: "Full Stack developer",
    email: "1032211047@mitwpu.edu.in",
  },
  {
    name: "Paritosh Gogate",
    contributions: "Python Frontend developer",
    email: "1032211446@mitwpu.edu.in",
  },
  {
    name: "Mitheelesh Katarmal",
    contributions: "Python Frontend developer",
    email: "1032210539@mitwpu.edu.in",
  },
  {
    name: "Neel Bafna",
    contributions: "Web Developer",
    email: "1032210675@mitwpu.edu.in",
  },
];

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>About Our Project</h1>
      <p>
        Welcome to our currency data application! This project is a
        collaborative effort, and we're grateful to the following contributors
        for their valuable contributions:
      </p>

      <ul className="contributors-list">
        {contributors.map((contributor, index) => (
          <li key={index} className="contributor-item">
            <strong>{contributor.name}</strong> - {contributor.contributions}
            {contributor.email && (
              <span className="contributor-email"> - {contributor.email}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
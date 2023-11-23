import React, { useEffect, useState } from "react";
import "./Nav.css";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-mode"); // Apply dark theme class
    } else {
      document.body.classList.remove("dark-mode"); // Remove dark theme class
    }
  }, [isDarkTheme]);
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  const openLanguageMenu = () => {
    const selectBox = document.querySelector(".goog-te-combo");

    // Trigger a click event on the select box
    if (selectBox) {
      selectBox.click();
    }
  };

  return (
    <header className="sticky-header">
      <div className="box"></div>
      {/* <div className="box-2"></div> */}
      <div className="nav-container">
        <a href="#" className="logo">
          {/* <img src={logo} className="logoimg" height="50" width="150" /> */}
          <h1>Ex-Rates</h1>
        </a>
        <ul className="links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="dashboard.html">Dashboard</a>
          </li>
          <li className="signin">
            <a href="signin.html">Sign In</a>
          </li>
        </ul>
        <div className="theme-toggle">
          <input
            type="checkbox"
            id="theme-toggle-checkbox"
            checked={isDarkTheme}
            onChange={() => setIsDarkTheme(!isDarkTheme)}
          />
          <label for="theme-toggle-checkbox"></label>
        </div>
        <div id="google_element" onClick={openLanguageMenu}></div>
      </div>
    </header>
  );
};

export default Navbar;

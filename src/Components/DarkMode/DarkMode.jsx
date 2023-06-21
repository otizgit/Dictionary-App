import React from "react";
import "./DarkMode.css";

const DarkMode = () => {
  function setDarkMode() {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
  function setLightMode() {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }

  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    setDarkMode();
  }

  function toggleTheme(e) {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  }

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={theme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <img className="sun" src="./Sun.svg" alt="" />
        <img className="moon" src="./Moon.svg" alt="" />
      </label>
    </div>
  );
};

export default DarkMode;

import React, { useState } from "react";
import Dictionary from "./Components/Dictionary";
import DarkMode from "./Components/DarkMode/DarkMode";

export default function App() {
  const [inputData, setInputData] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [change, setChange] = useState(true);

  function handleChange(e) {
    const value = e.target.value;
    setInputData(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputData !== "") {
      setShowResults(true);
      setChange((prevChange) => !prevChange);
    } else {
      alert("Please enter a word");
    }
  }

  return (
    <main>
      <header className="flex">
        <i className="fa-solid fa-book"></i>
        <div className="theme flex">
          <DarkMode />
        </div>
      </header>

      <div className="search-div">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a word"
            required
            type="search-box"
            onChange={handleChange}
            value={inputData}
          />
        </form>
        <i className="fa-solid fa-magnifying-glass" onClick={handleSubmit}></i>
      </div>

      {showResults && <Dictionary input={inputData} trigger={change} />}
    </main>
  );
}

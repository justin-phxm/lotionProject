import React, { useContext } from "react";
import EditorContext from "../EditorContext";
export default function Header() {
  function hideNotes() {
    let userNotes = document.getElementById("userNotes");
    let noteBar = document.getElementById("noteBar");
    if (userNotes.style.display === "none") {
      userNotes.style.display = "block";
      noteBar.setAttribute("class", "col-span-5");
    } else {
      userNotes.style.display = "none";
      noteBar.setAttribute("class", "col-span-6");
    }
  }
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const { darkMode, setDarkMode } = useContext(EditorContext);
  return (
    <header className="flex relative flex-col text-center justify-center border-b dark:bg-slate-800 dark:text-white ">
      <div className="text-3xl font-bold">
        <button
          className="absolute left-2 top-0"
          id="menuButton"
          onClick={hideNotes}>
          &#9776;
        </button>{" "}
        <button
          className="absolute text-xl right-4 dark:bg-slate-600 bg-slate-300 p-1 rounded-full top-2"
          id="menuButton"
          onClick={toggleDarkMode}>
          {darkMode ? "🌞" : "🌙"}
        </button>
        <a href="/">Lotion</a>
      </div>
      <div>Like Notion, but worse.</div>
    </header>
  );
}

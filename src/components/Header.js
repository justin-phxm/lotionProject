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
    <header className="relative flex flex-col justify-center border-b text-center dark:bg-slate-800 dark:text-white ">
      <div className="text-3xl font-bold">
        <button
          className="absolute left-2 top-0"
          id="menuButton"
          onClick={hideNotes}
        >
          &#9776;
        </button>{" "}
        <button
          className="absolute right-4 top-2 rounded-full bg-slate-300 p-1 text-xl dark:bg-slate-600"
          id="menuButton"
          onClick={toggleDarkMode}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
        <a href="/">Lotion</a>
      </div>
      <div>Like Notion, but worse.</div>
    </header>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import EditorContext from "./EditorContext";
export default function Notes({ note, setSelect, formattedDate }) {
  const navigate = useNavigate();
  function handleNoteClick() {
    setSelect(note.id);
    let theContent = document.getElementById("theContent");
    theContent.innerHTML = note.content;
    document.getElementById("noteTitle").value = note.title;
    document.getElementById("noteTime").value = note.date;
    setShowEditor(true);
    setEditMode(false);
    navigate(`/notes/${note.id}`);
  }
  let newFormatTime = formattedDate(note.date);
  const { setShowEditor, setEditMode, selectedNoteID } =
    useContext(EditorContext);
  return (
    <div>
      <button
        id={note.id}
        onClick={handleNoteClick}
        className={`flex h-24 w-full flex-col truncate bg-slate-500 p-4 text-left text-sm text-white shadow-lg hover:opacity-90 dark:border-b dark:border-white dark:bg-slate-900 ${
          selectedNoteID === note.id ? " bg-gray-400 dark:bg-gray-800" : ""
        }`}
      >
        <div className="w-full text-xl font-bold">{note.title}</div>
        <div className="text-light w-full">{newFormatTime}</div>
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </button>
    </div>
  );
}

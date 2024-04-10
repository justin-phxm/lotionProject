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
    let saveButton = document.getElementById("saveButton");
    saveButton.setAttribute("class", "hidden");
    setShowEditor(true);
    navigate(`/notes/${note.id}`);
  }
  let newFormatTime = formattedDate(note.date);

  const { setShowEditor } = useContext(EditorContext);

  return (
    <div>
      <button
        id={note.id}
        onClick={handleNoteClick}
        className="flex flex-col w-full p-4 h-20 bg-slate-500 hover:bg-slate-600 rounded-none text-white text-left">
        <div className="font-bold text-xl float-left">{note.title}</div>
        <div className="text-sm text-light float-left">{newFormatTime}</div>
        <div>{note.content}</div>
      </button>
    </div>
  );
}

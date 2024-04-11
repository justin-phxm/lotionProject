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
    navigate(`/notes/${note.id}`);
  }
  let newFormatTime = formattedDate(note.date);
  const { setShowEditor } = useContext(EditorContext);
  return (
    <div>
      <button
        id={note.id}
        onClick={handleNoteClick}
        className="flex flex-col w-full p-4 h-24 bg-slate-500 hover:bg-slate-600 rounded-none text-white text-left">
        <div className="font-bold overflow-hidden h-12 text-xl w-full">
          {note.title}
        </div>
        <div className="text-sm text-light">{newFormatTime}</div>
        <div
          className="overflow-hidden truncate h-12 text-sm w-full"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </button>
    </div>
  );
}

import { formatDate } from "./lib/utils";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Header from "./components/Header";
import NoteBar from "./NoteBar";
import NotesSidebar from "./components/NotesSidebar";
import EditorContext from "./EditorContext";
export default function Layout() {
  const LOCAL_STORAGE_KEY = "notesApp.notes";
  const storedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const [notes, setNotes] = useState(storedNotes || []);
  const [selected, setSelected] = useState();
  const [showEditor, setShowEditor] = useState(false);
  const noteTitleRef = useRef();
  const noContentRef = useRef();
  const noteInfoRef = useRef();
  const noteTimeRef = useRef();
  const theContentRef = useRef();
  const quillRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function handleDeleteNote() {
    const selectedNote = notes.find((note) => note.id === selected);
    if (selectedNote === undefined) return;
    const answer = window.confirm(
      `Are you sure you want to delete note ${selectedNote.title}?`
    );
    if (answer) {
      const newNotes = notes.filter((note) => {
        return note.id !== selected;
      });
      setNotes(newNotes);
      setShowEditor(false);
      navigate("/");
    }
  }

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
  function saveNote(id) {
    const newNotes = [...notes];
    const note = newNotes.find((note) => note.id === id);
    let theTitle = noteTitleRef.current.value;
    let theDate = noteTimeRef.current.value;
    let quillContent = quillRef.current.value;
    if (theDate === "") theDate = formatDate();
    note.title = theTitle;
    note.date = theDate;
    note.content = quillContent;
    setNotes(newNotes);

    const saveButton = document.getElementById("saveButton");
    const editButton = document.getElementById("editButton");

    const quill = document.getElementById("quill");
    quill.setAttribute("class", "hidden");

    // // Show Content
    console.log("Pass");
    const contentDiv = document.getElementById("theContent");
    contentDiv.innerHTML = quillContent;
    contentDiv.setAttribute("class", "visible");

    saveButton.setAttribute("class", "hidden");

    // // Show Edit Button
    editButton.setAttribute(
      "class",
      "visible hover:bg-slate-500 h-full p-[3vh]"
    );
    navigate(`/notes/${id}/edit`);
  }
  function editNote(id) {
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");

    //show quill editor
    console.log(theContentRef.current.innerHTML);
    const quill = document.getElementById("quill");
    quill.setAttribute("class", "visible");

    const contentDiv = document.getElementById("theContent");
    contentDiv.setAttribute("class", "hidden");

    // Show Save Button
    saveButton.setAttribute(
      "class",
      "visible hover:bg-slate-500 h-full p-[3vh]"
    );

    // Hide Edit Button
    editButton.setAttribute("class", "hidden");
    navigate(`/notes/${id}`);
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  function formattedDate(when) {
    when = new Date(when);
    if (when === "Invalid Date") {
      console.log("Invalid Date");
      return "Invalid Date";
    } else return when.toLocaleString("en-US", options);
  }

  function handleSaveClick() {
    saveNote(selected);
  }
  function handleEditClick() {
    editNote(selected);
  }
  const editorData = {
    showEditor,
    setShowEditor,
    selected,
    setSelect: setSelected,
  };
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <Header hideNotes={hideNotes} />
      <div id="hero" className=" grid grid-cols-6 gap-1 h-full ">
        <EditorContext.Provider value={editorData}>
          <NotesSidebar
            props={{
              notes,
              setNotes,
              setSelect: setSelected,
              formattedDate,
              noteInfoRef,
              noteTitleRef,
              noteTimeRef,
              showEditor,
              setShowEditor,
            }}
          />
          <NoteBar
            props={{
              state: notes,
              noteTitleRef,
              noteInfoRef,
              noteTimeRef,
              quillRef,
              noContentRef,
              theContentRef,
              handleSaveClick,
              handleEditClick,
              handleDeleteNote,
              showEditor,
              setShowEditor,
            }}
          />
        </EditorContext.Provider>
      </div>
    </div>
  );
}

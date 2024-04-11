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
  const [selectedNoteID, setSelectedNoteID] = useState();
  const [showEditor, setShowEditor] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const noteTitleRef = useRef();
  const noteInfoRef = useRef();
  const noteTimeRef = useRef();
  const theContentRef = useRef();
  const quillRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function handleDeleteNote() {
    const selectedNote = notes.find((note) => note.id === selectedNoteID);
    if (selectedNote === undefined) return;
    const answer = window.confirm(
      `Are you sure you want to delete note ${selectedNote.title}?`,
    );
    if (answer) {
      const newNotes = notes.filter((note) => {
        return note.id !== selectedNoteID;
      });
      setEditMode(false);
      setNotes(newNotes);
      setShowEditor(false);
      navigate("/");
    }
  }

  function saveNote(id) {
    const newNotes = [...notes];
    const note = newNotes.find((note) => note.id === id);
    let theTitle = noteTitleRef.current.value;
    let theDate = noteTimeRef.current.value;
    let quillContent = quillRef.current.value;
    note.title = theTitle;
    note.date = theDate;
    note.content = quillContent;
    setNotes(newNotes);
    const contentDiv = document.getElementById("theContent");
    contentDiv.innerHTML = quillContent;
    navigate(`/notes/${id}/edit`);
  }
  const editorData = {
    showEditor,
    setShowEditor,
    selectedNoteID,
    setSelectedNoteID,
    editMode,
    setEditMode,
    darkMode,
    setDarkMode,
  };
  return (
    <EditorContext.Provider value={editorData}>
      <div
        className={
          "flex h-screen min-h-screen flex-col dark:text-white" +
          (!darkMode ? " dark" : "")
        }
      >
        <Header />
        <div
          id="hero"
          className=" darkbg-green-400 grid h-full grid-cols-6 gap-1 dark:bg-slate-800 dark:text-white "
        >
          <NotesSidebar
            props={{
              notes,
              setNotes,
              setSelect: setSelectedNoteID,
              noteInfoRef,
              noteTitleRef,
              noteTimeRef,
              showEditor,
              setShowEditor,
            }}
          />
          <NoteBar
            props={{
              notes,
              noteTitleRef,
              noteInfoRef,
              noteTimeRef,
              quillRef,
              theContentRef,
              handleDeleteNote,
              saveNote,
              showEditor,
              selectedNoteID,
            }}
          />
        </div>
      </div>
    </EditorContext.Provider>
  );
}

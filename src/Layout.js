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
  const [state, setState] = useState([]);
  const [selected, setSelect] = useState();
  const [showEditor, setShowEditor] = useState(false);
  const noteTitleRef = useRef();
  const noContentRef = useRef();
  const noteInfoRef = useRef();
  const noteTimeRef = useRef();
  const theContentRef = useRef();
  const quillRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedNotes) setState((prevNotes) => [...prevNotes, ...storedNotes]);
    if (storedNotes === null) return;
    if (storedNotes.length > 0) {
    }
    if (storedNotes.length > 0) {
      const noteInfo = noteInfoRef.current;
      noteInfo.setAttribute("class", "bg-red-500 h-[9vh]");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function handleDeleteNote() {
    const selectedNote = state.find((note) => note.id === selected);
    if (selectedNote === undefined) return;
    const answer = window.confirm(
      `Are you sure you want to delete note ${selectedNote.title}?`
    );
    if (answer) {
      const newNotes = state.filter((note) => {
        return note.id !== selected;
      });
      setState(newNotes);
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
    const newNotes = [...state];
    // console.log(newNotes)
    const note = newNotes.find((note) => note.id === id);
    // console.log(note)

    let theTitle = noteTitleRef.current.value;
    let theDate = noteTimeRef.current.value;
    let quillContent = quillRef.current.value;
    if (theDate === "") theDate = formatDate();
    // theDate = formattedDate(theDate)
    note.title = theTitle;
    note.date = theDate;
    note.content = quillContent;
    setState(newNotes);

    // const theContentElement = contentElementRef.current
    // theContentElement.innerHTML = quillContent
    // // Update note Button content
    // let saveString = noteData.slice(0, 25)
    // if(noteData.length > 25){
    //   saveString += "..."
    // }
    // noteButton.childNodes[2].innerHTML = saveString

    // //Change Save Button to Edit
    const saveButton = document.getElementById("saveButton");
    const editButton = document.getElementById("editButton");

    // // DO NOT USE replaceWith() AS IT CAUSES ERROR IN UPDATING THE BUTTON
    // // saveButton.replaceWith(editButton)

    // //hide quill editor
    const quill = document.getElementById("quill");
    quill.setAttribute("class", "hidden");

    // // Show Content
    console.log("Pass");
    const contentDiv = document.getElementById("theContent");
    contentDiv.innerHTML = quillContent;
    contentDiv.setAttribute("class", "visible");

    // theContent
    // theContentRef.current = "Hello WOrld"
    // theContentRef.current.setAttribute("class", "visible")

    // // Hide Save Button
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
    // console.log(selected)
    saveNote(selected);
  }
  function handleEditClick() {
    editNote(selected);
  }
  const editorData = {
    showEditor,
    setShowEditor,
  };
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <Header hideNotes={hideNotes} />
      <div id="hero" className=" grid grid-cols-6 gap-1 h-full ">
        <EditorContext.Provider value={editorData}>
          <NotesSidebar
            props={{
              state,
              setState,
              setSelect,
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
              state,
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

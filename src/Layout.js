import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from 'react-quill';
import NotesList from "./NotesList";
import 'react-quill/dist/quill.snow.css';
import Notes from "./Notes";
import { v4 as uuidv4 } from 'uuid';


export default function Layout() {
  const LOCAL_STORAGE_KEY = "notesApp.notes"
  const [state, setState] = useState([]);
  const [selected, setSelect] = useState();
  const noteTitleRef = useRef()
  const emptyRef = useRef()
  const noContentRef = useRef()
  const noteInfoRef = useRef()
  const noteTimeRef = useRef()
  const theContentRef = useRef()
  const quillRef = useRef()
  const contentElementRef = useRef()
  const navigate = useNavigate()
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedNotes) setState(prevNotes => [...prevNotes, ...storedNotes])
    if(storedNotes === null) return
    if(storedNotes.length > 0){
      const emptyCheck = emptyRef.current
      emptyCheck.remove()
    }
    if(storedNotes.length > 0){
      const noteInfo = noteInfoRef.current
      noteInfo.setAttribute("class", "bg-red-500 h-[9vh]")
    }
  },[] )

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
    console.log(state.id)
  }, [state])

  // useEffect(() =>{
  //   noteInfoRef.current.setAttribute("class", "visible")
  // }, [selected])

  function handleDeleteNote(){
    console.log("deleteNote run")
    const selectedNote = state.find(note => note.id === selected)
    if (selectedNote === undefined) return
    const answer = window.confirm(`Are you sure you want to delete note ${selectedNote.title}?`)  
    if(answer){
      const newNotes = state.filter(note => {return (note.id !== selected)})
      setState(newNotes)
      let quillEditor = document.getElementById("quill")
      quillEditor.setAttribute("class", "hidden")
    }

  }
  function handleNewNote(){ 
    // const title = noteTitleRef.current.value 
    // if (title === "") return
    const emptyCheck = emptyRef.current
    emptyCheck.remove()
    const noContentCheck = noContentRef.current
    noContentCheck.remove()

    const noteInfo = noteInfoRef.current
    noteInfo.setAttribute("class", "bg-red-500 h-[9vh]")

    const quillEditor = quillRef.current

    let genID = uuidv4()
    setSelect(genID)
    setState(prevState =>{
      return [...prevState, {id: genID, title: "Untitled", date: formattedDate(formatDate()), content: ""}]
    })
    noteTitleRef.current.value = null
    // console.log(state.id)
    // //KEEP Below
    document.getElementById("quill").setAttribute("class", "visible")
    noteTimeRef.current.value = formatDate()
    navigate(`/notes/${genID}`)
  }



  function hideNotes(){
    let userNotes = document.getElementById("userNotes")
    let noteBar = document.getElementById("noteBar")
    if(userNotes.style.display === "none"){
      userNotes.style.display = "block"
      noteBar.setAttribute("class", "col-span-5")
    }else{
      userNotes.style.display = "none"
      noteBar.setAttribute("class", "col-span-6")
    }
  }
  function saveNote(id){
    const newNotes = [...state]
    // console.log(newNotes)
    const note = newNotes.find(note => note.id === id)
    // console.log(note)

    let theTitle = noteTitleRef.current.value
    let theDate = noteTimeRef.current.value
    let quillContent = quillRef.current.value
    if(theDate === "") theDate = formatDate()
    // theDate = formattedDate(theDate)
    note.title = theTitle
    note.date = theDate
    note.content = quillContent
    setState(newNotes)
  
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
    const quill = document.getElementById("quill")
    quill.setAttribute("class", "hidden")

    // // Show Content
    console.log("Pass")
    const contentDiv = document.getElementById("theContent")
    contentDiv.innerHTML = quillContent
    contentDiv.setAttribute("class", "visible")

    // theContent
    // theContentRef.current = "Hello WOrld"
    // theContentRef.current.setAttribute("class", "visible")

    // // Hide Save Button
    saveButton.setAttribute("class", "hidden")

    // // Show Edit Button
    editButton.setAttribute("class", "visible hover:bg-slate-500 h-full p-[3vh]")
    navigate(`/notes/${id}/edit`)
  }
  function editNote(id){
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");

    //show quill editor
    console.log(theContentRef.current.innerHTML)
    const quill = document.getElementById("quill")
    quill.setAttribute("class", "visible")

    const contentDiv = document.getElementById("theContent")
    contentDiv.setAttribute("class", "hidden")

    // Show Save Button
    saveButton.setAttribute("class", "visible hover:bg-slate-500 h-full p-[3vh]")

    // Hide Edit Button
    editButton.setAttribute("class", "hidden")
    navigate(`/notes/${id}`)
  }

  const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  };
  function formatDate(){
    // const date = new Date().toLocaleString("en-US", options)
    const date = new Date().toISOString().slice(0, 10) + "T10:15"
    return date;
  }

  function formattedDate(when){
    when = new Date(when)
    if(when === "Invalid Date") {
      console.log("Invalid Date")
      return("Invalid Date")
    }
    else return(when.toLocaleString("en-US", options))
  }

  function handleSaveClick(){
    // console.log(selected)
    saveNote(selected)
  }
  function handleEditClick(){
    editNote(selected)
  }
  return (
    <>
      <header className="flex flex-col text-center ">
        <div className="text-3xl font-bold" > 
          <span className= "float-left">
          <button id="menuButton" onClick={hideNotes}>&#9776;</button>
          </span>
          Lotion
        </div>
        <div>Like Notion, but worse.</div>
        <div className="h-0.5 bg-slate-100"></div>
      </header>
      <div id="hero" className=" grid grid-cols-6 gap-1 ">
        <div id="userNotes" className="col-span-1  bg-slate-200 h-[91vh]">
          <div id="addNotesBar" className="bg-slate-300 font-bold text-xl">
            Notes
            <button id="newNote" className="text-xl float-right hover:bg-slate-500" onClick={handleNewNote}>+</button>
          </div>
          <div className="h-px bg-slate-100"/>
          <div id="notesContainer">
            <span ref={emptyRef}id="empty" className="font-light">No Note yet</span>
            <NotesList notes={state} setSelect={setSelect} formattedDate={formattedDate}/>
          </div>
        </div>

        <div id="noteBar" className="col-span-5 h-[91vh]">
          <div ref={noteInfoRef} id="noteInfo" className="hidden"> 
            <div id="Title" className="text-3xl">
              <input ref={noteTitleRef} id="noteTitle" type="text" placeholder="Untitled" className="border-2 placeholder:text-black outline-blue-500/0 bg-inherit border-blue-500/0 focus:outline-none"/>
              <div id= "noteButtons" className="text-xl float-right">
                <button id="saveButton" className="hover:bg-slate-500 h-full p-[3vh]" onClick={handleSaveClick}>Save</button> 
                <button id="editButton" className="hidden hover:bg-slate-500 h-full p-[3vh]" onClick={handleEditClick}>Edit</button>
                <button id="deleteButton"className="hover:bg-slate-500 p-[3vh]" onClick={handleDeleteNote}>Delete</button>
              </div>
            </div>
            <div id="Time" className="text-sm">
              <input ref={noteTimeRef} id="noteTime" type="datetime-local" className="bg-inherit"/>
            </div>
          </div>
          <div id="content" className="h-[65vh]">
            {/* <Outlet /> */}
            <div>
              <ReactQuill id="quill" ref={quillRef} value={state.content} placeholder="Your Note Here" className="hidden"/>    
              <div ref={theContentRef} id="theContent" className="hidden"/>
              <div ref={noContentRef} id="noContent" className="h-[50vh] text-center mt-56 text-xl font-light align-middle">
                Select a note, or create a new one.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
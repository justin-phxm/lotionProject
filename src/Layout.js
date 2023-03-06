import { Outlet, useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Layout() {
  const { notesID } = useParams();
  const navigate = useNavigate()
  // noteID is the variable that holds the value of the notesID.
  // We can use this to get the note from the database.
  const handleContentChange = (value) => {
    setState(prevState => ({...prevState, content: value}))
  }
  function stateInitial(){
    let noteCount = 0
    for (let i = 0; i < localStorage.length; i++){
      let data = JSON.parse(localStorage.getItem(`note${i}`))
      if(data !== null){
        noteCount++
      }
    }
    return ({count: noteCount, title: "Untitled", date: "", content: ""})
  }
  const [state, setState] = useState(() => stateInitial());

  useEffect(() =>{
    document.getElementById("theContent").innerHTML = state.content;
    // data.content = content
  }, [state.content])
  useEffect(() =>{
    document.getElementById("noteTime").value = formatDate()
    let data = JSON.parse(localStorage.getItem(`note1`))
    if(data !== null){
      document.getElementById("empty").setAttribute("class", "hidden")
      document.getElementById("noContent").setAttribute("class", "hidden")
      document.getElementById("noteInfo").classList.remove("hidden")
    }
    for (let i = 0; i < localStorage.length; i++){
      if(document.getElementById("notesContainer").childElementCount < localStorage.length){
        let data = JSON.parse(localStorage.getItem(`note${i}`))
        if(data !== null){
          // console.log(data)
          let theButton = myFunc(i, data.title, formattedDate(data.date), data.content)
          // console.log(theButton)
          document.getElementById("notesContainer").appendChild(theButton);
          // setState(prevState => ({...prevState, title: theTitle, date: theDate, content: noteData}))
          // setState(prevState => ({...prevState, count: state.count + 1}))
          // console.log(state.count)
        }
      }
    }
  }, [])

  function myFunc(buttonCount, buttonTitle, buttonDate, buttonContent){
        // create button
      
      const button = document.createElement("button");
      const titleDiv = document.createElement("div");
      const dateDiv = document.createElement("div");
      const contentDiv = document.createElement("div");
      const separatorDiv = document.createElement("div");

      // Shows notes if there are any
      // emptyContent.setAttribute("class", "hidden")
      // quillEditor.setAttribute("class", "visible")

      // Fill button with data
      titleDiv.innerHTML = buttonTitle
      dateDiv.innerHTML = buttonDate
      contentDiv.innerHTML = buttonContent
      button.id = `title${buttonCount}`
      button.className = "flex flex-col w-full h-[10vh] bg-slate-500 hover:bg-slate-600 rounded-none p-[3vh] text-white text-left"
      
      
      //Add classes to divs
      titleDiv.setAttribute("class", "font-bold text-xl float-left")
      dateDiv.setAttribute("class", "text-sm text-neutral-500 text-light float-left")
      contentDiv.setAttribute("class", "float-left")
      separatorDiv.setAttribute("class", "h-px bg-slate-100")
      separatorDiv.setAttribute("id", `${buttonCount}Separator`)

      
      button.appendChild(titleDiv)
      button.appendChild(dateDiv)
      button.appendChild(contentDiv)
      button.setAttribute("class", "focus:bg-slate-600 focus:text-white hover:bg-slate-500 w-full p-2")
      button.setAttribute("id", `title${buttonCount}`)
      button.setAttribute("onClick", `navigate('/${buttonCount}')`)
      // console.log(`/${buttonCount}`)
      let buttonComponent = document.createElement("div")
      buttonComponent.appendChild(button)
      buttonComponent.appendChild(separatorDiv)
      return(buttonComponent)
  }

  function deleteNote(){
    if(state.count > 0){
      const button = document.getElementById(`title${state.count}`)
      const noteTitle= button.childNodes[0].innerHTML
      const answer = window.confirm(`Are you sure you want to delete note ${noteTitle}?`)  
      if(answer){
        const separator = document.getElementById(`${state.count}Separator`)
        button.remove()
        separator.remove()
        localStorage.removeItem(`note${state.count}`);
        setState(prevState => ({...prevState, count: state.count - 1}))
      }
    }
  }

  function newNote(){ 

    document.getElementById("noteInfo").classList.remove("hidden")
    setState(prevState => ({...prevState, count: state.count + 1, title: "Untitled", date: "", content: ""}))
    // console.log("Currently Editing Note: " + (state.count + 1))

    let theButton = myFunc((state.count + 1), "Untitled", formattedDate(formatDate()), "...")
    document.getElementById("notesContainer").appendChild(theButton);

    //KEEP Below
    document.getElementById("noContent").setAttribute("class", "hidden")
    document.getElementById("empty").setAttribute("class", "hidden")
    document.getElementById("quill").setAttribute("class", "visible")
    document.getElementById("noteTitle").value = "Untitled"
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");
    saveButton.setAttribute("class", "visible hover:bg-slate-500 h-full p-[3vh]")
    editButton.setAttribute("class", "hidden")      
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
  function saveNote(){
    //Problem is count is not updating when new note is created. count is always value 1.
    // Problem could be in newNote(). Watch useState video and review again. Could be const keyword causing errors.
    // maybe use state.count or update with useEffect().

    let theTitle = document.getElementById("noteTitle").value
    let theDate = document.getElementById("noteTime").value  
    let noteData = document.getElementById("theContent").innerHTML
    if(theTitle === ""){
      theTitle = "Untitled"
    }
    if(noteData === ""){
      noteData = "..."
    }
    
    setState(prevState => ({...prevState, title: theTitle, date: theDate, content: noteData}))

    // Save to local storage
    const data = {title: theTitle, date:theDate, content: noteData}
    localStorage.setItem(`note${state.count}`, JSON.stringify(data));

    // Update note Button content
    const noteButton = document.getElementById(`title${state.count}`)
    console.log(state.count)
    console.log(theTitle)
    noteButton.childNodes[0].innerHTML = theTitle
    // Update functionality...
    noteButton.childNodes[1].innerHTML = formattedDate(theDate)
    let saveString = noteData.slice(0, 25)
    if(noteData.length > 25){
      saveString += "..."
    }
    noteButton.childNodes[2].innerHTML = saveString

    //Change Save Button to Edit
    const saveButton = document.getElementById("saveButton");
    const editButton = document.getElementById("editButton");
    // editButton.setAttribute("id", "editButton")
    // editButton.setAttribute("class", "hover:bg-slate-500 h-full p-[3vh]")
    // editButton.addEventListener("click", () => editNote())
    // editButton.innerHTML = "Edit"



    // DO NOT USE replaceWith() AS IT CAUSES ERROR IN UPDATING THE BUTTON
    // saveButton.replaceWith(editButton)


    //hide quill editor
    const quill = document.getElementById("quill")
    quill.setAttribute("class", "hidden")

    // Show Content
    const noteContent = document.getElementById("theContent")
    noteContent.setAttribute("class", "visible")

    // Hide Save Button
    saveButton.setAttribute("class", "hidden")

    // Show Edit Button
    editButton.setAttribute("class", "visible hover:bg-slate-500 h-full p-[3vh]")

  }
  function editNote(){
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");
    // saveButton.setAttribute("class", "hover:bg-slate-500 h-full p-[3vh]")
    // saveButton.setAttribute("id", "saveButton")
    // saveButton.addEventListener("click", () => saveNote())
    // saveButton.innerHTML = "Save"
    // editButton.replaceWith(saveButton)

    //show quill editor
    const quill = document.getElementById("quill")
    quill.setAttribute("class", "visible")

    const noteContent = document.getElementById("theContent")
    noteContent.setAttribute("class", "hidden")

    // Show Save Button
    saveButton.setAttribute("class", "visible hover:bg-slate-500 h-full p-[3vh]")

    // Hide Edit Button
    editButton.setAttribute("class", "hidden")
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
    return(when.toLocaleString("en-US", options))
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
            <button id="newNote" className="text-xl float-right hover:bg-slate-500" onClick={newNote}>+</button>
          </div>
          <div className="h-px bg-slate-100"/>
          <div id="notesContainer">
            <span id="empty" className="font-light">No Note yet</span>

          </div>
        </div>

        <div id="noteBar" className="col-span-5 h-[91vh] ">
          <div id="noteInfo" className="bg-red-500 h-[9vh] hidden"> 
            <div id="Title" className="text-3xl">
              <input id="noteTitle" className="border-2 placeholder:text-black outline-blue-500/0 bg-inherit border-blue-500/0 focus:outline-none"/>
              <div id= "noteButtons" className="text-xl float-right">

                <button id="saveButton" className="hover:bg-slate-500 h-full p-[3vh]" onClick={saveNote}>Save</button> 
                <button id="editButton" className="hidden hover:bg-slate-500 h-full p-[3vh]" onClick={editNote}>Edit</button>
                <button id="deleteButton"className="hover:bg-slate-500 p-[3vh]" onClick={deleteNote}>Delete</button>
              </div>
            </div>
            <div id="Time" className="text-sm">
              <input id="noteTime" type="datetime-local" className="bg-inherit"/>
            </div>
          </div>
          <div id="content" className="h-[65vh]">
          {/* <h1>HelloWorld</h1> */}

          {/* child components get injected here and replace <Outlet /> */}
            {/* <Outlet /> */}
          <div>
            <ReactQuill id="quill" value={state.content} placeholder="Your Note Here" onChange={handleContentChange} className="hidden"/>    
            <div id="theContent" className="hidden"/>
            <div id="noContent" className="h-[50vh] text-center">
              <div className="mt-56 text-xl font-light align-middle">Select a note, or create a new one.</div>
            </div>
          </div>
        </div>
        </div>

      </div>
    </>
  )
}


export default Layout;
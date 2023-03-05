import { Outlet, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Layout() {
  const { notesID } = useParams();
  // noteID is the variable that holds the value of the notesID.
  // We can use this to get the note from the database.
  // const [content, setContent] = useState('');
  const handleContentChange = (value) => {
    setState(prevState => ({...prevState, content: value}))
  }
  function decrementCount(){
    setState(prevState => {
      return {...prevState, count: state.count - 1}
    })
  }
  function incrementCount(){
    setState(prevState => {
      return {...prevState, count: state.count + 1}
    })
  }
  function stateInitial(){
    return ({count: 0, title: "Untitled", date: "", content: ""})
  }
  const [state, setState] = useState(() => stateInitial());
  // const count = state.count
  // const title = state.title
  // const date = state.date
  // const notecontent = state.content
  useEffect(() =>{
    // console.log('render')
    document.getElementById("theContent").innerHTML = state.content;
    // data.content = content
  }, [state.content])
  // On page load...
  useEffect(() =>{
    formatDate()
    // console.log("You are on count: " +  count)
    for (var i = 0; i < localStorage.length; i++){
        console.log(localStorage.getItem(`note${i}`))
      }
  }, [])
  useEffect(() =>{
    console.log("You are on count: " +  state.count)
    // state.count = state.count + 1
  }, [state.count])
  function deleteNote(){
    if(state.count > 0){
      // console.log("decrement State")

      const button = document.getElementById(`title${state.count}`)
      const noteTitle= button.childNodes[0].innerHTML
      const answer = window.confirm(`Are you sure you want to delete note ${noteTitle}?`)  
      if(answer){
        const separator = document.getElementById(`${state.count}Separator`)
        // console.log((`title${count}`))
        button.remove()
        separator.remove()
        localStorage.removeItem(`note${state.count}`);
        console.log("You have deleted: " + state.count)
        // setState(prevState => ({...prevState, count: state.count - 1, title: `Untitled${state.count - 1}`}))
        decrementCount()
      }
    }
  }

  function newNote(){ 
      // setState(prevState => ({...prevState, count: state.count + 1}))
      incrementCount()
      const button = document.createElement("button");
      const titleDiv = document.createElement("div");
      const dateDiv = document.createElement("div");
      const contentDiv = document.createElement("div");
      const separatorDiv = document.createElement("div");

      titleDiv.innerHTML = "Untitled"
      let currentTime = document.getElementById("noteTime").value
      let emptyContent = document.getElementById("noContent")
      let quillEditor = document.getElementById("quill")
      emptyContent.setAttribute("class", "hidden")
      quillEditor.setAttribute("class", "visible")
      document.getElementById("noteTitle").value = "Untitled"
      // console.log(editTitle)
      // editTitle = "Untitled"
      dateDiv.innerHTML = formattedDate(currentTime)
      contentDiv.innerHTML = "..."
      
      //Add classes to divs
      titleDiv.setAttribute("class", "font-bold text-xl float-left")
      dateDiv.setAttribute("class", "text-sm text-neutral-500 text-light float-left")
      contentDiv.setAttribute("class", "float-left")
      separatorDiv.setAttribute("class", "h-px bg-slate-100")
      // Don't need line below?
      separatorDiv.setAttribute("id", `${state.count + 1}Separator`)

      button.appendChild(titleDiv)
      button.appendChild(dateDiv)
      button.appendChild(contentDiv)

      button.setAttribute("class", "focus:bg-slate-600 focus:text-white hover:bg-slate-500 w-full p-2")
      button.setAttribute("id", `title${state.count + 1}`)
      button.setAttribute("onClick", `window.alert(${state.count + 1})`)

      // Checks if there are any notes. If not, remove the empty message.
      if(document.getElementById("empty") != null){
        document.getElementById("empty").remove()
      }
      
      document.getElementById("notesContainer").appendChild(button);
      document.getElementById("notesContainer").appendChild(separatorDiv);
      
      const editButton = document.getElementById("editButton");
      const saveButton = document.getElementById("saveButton");

      // Show Save Button
      saveButton.setAttribute("class", "visible hover:bg-slate-500 h-full p-[3vh]")

      // Hide Edit Button
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
// function printCount(){
//   console.log(state.count)
// }
function saveNote(){
  //Problem is count is not updating when new note is created. count is always value 1.
  // Problem could be in newNote(). Watch useState video and review again. Could be const keyword causing errors.
  // maybe use state.count or update with useEffect().
  
  console.log("Saving for title" + state.count)

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

  // let item = JSON.parse(localStorage.getItem(`note${count}`));
  // for (var i = 0; i < localStorage.length; i++){
  //   console.log(localStorage.getItem(`note${i}`))
  // }

  // Update note Button content
  const noteButton = document.getElementById(`title${state.count}`)
  // console.log(noteButton)
  noteButton.childNodes[0].innerHTML = theTitle
  // Update functionality...
  noteButton.childNodes[1].innerHTML = formattedDate(theDate)
  // console.log("Length: " + noteData.length)

  noteButton.childNodes[2].innerHTML = noteData.slice(0, 25) + "..."

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
  // console.log("Edited")
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
  document.getElementById("noteTime").value = date
}

// Would like for formattedDate() to accept a date parameter and return in the specified format.
function formattedDate(when){
  // console.log("when = " + when)
  when = new Date(when)
  return(when.toLocaleString("en-US", options))
  // console.log("date = " + date)
  // return date
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
          <div id="noteInfo" className="bg-red-500 h-[9vh]"> 
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
          <div id="content" className="h-[82vh]">
          {/* <h1>HelloWorld</h1> */}

          {/* child components get injected here and replace <Outlet /> */}
          {/* <Outlet /> */}
          <div>
            <ReactQuill id="quill" value={state.content} onChange={handleContentChange} className="hidden"/>    
            <div id="theContent" className="hidden"/>
            <div id="noContent" className="h-[82vh] text-center">
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
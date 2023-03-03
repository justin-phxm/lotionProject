import { Outlet, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
// import React,  { useState } from 'react'
// import { useParams } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Layout() {
  const { notesID } = useParams();
  // noteID is the variable that holds the value of the notesID.
  // We can use this to get the note from the database.
  const [content, setContent] = useState('');
  const handleContentChange = (value) => {
      setContent(value);
      // console.log(content)
      // document.getElementById("theContent").innerHTML = content;
  }

  function stateInitial(){
    return ({count: 0, title: "Untitled", date: "", content: "..."})
  }
  const [state, setState] = useState(() => stateInitial());
  const count = state.count
  const title = state.title
  // const date = state.date
  // const notecontent = state.content
  useEffect(() =>{
    // console.log('render')
    document.getElementById("theContent").innerHTML = content;
    // data.content = content
  }, [content])
  useEffect(() =>{
    formatDate()
    console.log("You are on count: " +  count)
  }, [])

  function deleteNote(){
    if(count > 0){
      console.log("decrement State")
      const answer = window.confirm(`Are you sure you want to delete ${title}?`)  
      if(answer){
        const button = document.getElementById(`title${count}`)
        const separator = document.getElementById(`${count}Separator`)
        // console.log((`title${count}`))
        button.remove()
        separator.remove()
        console.log("You have deleted: " + count)
        setState(prevState => ({...prevState, count: count - 1, title: `Untitled${count - 1}`}))
      }
    }
  }

  function newNote(){ 
      const button = document.createElement("button");
      const titleDiv = document.createElement("div");
      const dateDiv = document.createElement("div");
      const contentDiv = document.createElement("div");
      const separatorDiv = document.createElement("div");

      titleDiv.innerHTML = state.title
      dateDiv.innerHTML = ""
      contentDiv.innerHTML = state.content
      
      titleDiv.setAttribute("class", "font-bold text-xl float-left")
      dateDiv.setAttribute("class", "text-sm text-neutral-500 text-light float-left")
      contentDiv.setAttribute("class", "float-left")
      separatorDiv.setAttribute("class", "h-px bg-slate-100")
      separatorDiv.setAttribute("id", `${count + 1}Separator`)

      button.appendChild(titleDiv)
      button.appendChild(dateDiv)
      button.appendChild(contentDiv)

      button.setAttribute("class", "focus:bg-slate-600 focus:text-white hover:bg-slate-500 w-full p-2")
      button.setAttribute("id", `title${count + 1}`)
      button.setAttribute("onClick", `window.alert(${count + 1})`)
      if(document.getElementById("empty") != null){
        document.getElementById("empty").remove()
      }
      
      document.getElementById("notesContainer").appendChild(button);
      document.getElementById("notesContainer").appendChild(separatorDiv);
      
      setState(prevState => ({...prevState, count: count + 1, title: `Untitled${count + 1}`}))
      console.log("You are now on count: " + count)
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
  
  console.log("Saving for note" + count)
  let noteData = document.getElementById("theContent").innerHTML

  const theTitle = document.getElementById("noteTitle").value
  const theDate = document.getElementById("noteTime").value
  const data = {title: theTitle, date:theDate, content: noteData}
  // const data2 = {title: "myNote2", date:"December 25", content: "Merry Christmas!"}
  localStorage.setItem(`note${count}`, JSON.stringify(data));
  // localStorage.setItem('note2', JSON.stringify(data2))

  let item = JSON.parse(localStorage.getItem(`note${count}`));
  // const item2 = JSON.parse(localStorage.getItem('note2'));
  // console.log
  for (var i = 0; i < localStorage.length; i++){
    // console.log(`note${i}`)  
    console.log(localStorage.getItem(`note${i}`))
  }


  //Change Save Button to Edit
  const saveButton = document.getElementById("saveButton");
  const editButton = document.createElement("button");
  editButton.setAttribute("id", "editButton")
  editButton.setAttribute("class", "hover:bg-slate-500 h-full p-[3vh]")
  editButton.addEventListener("click", () => editNote())
  editButton.innerHTML = "Edit"
  saveButton.replaceWith(editButton)


  //hide quill editor
  const quill = document.getElementById("quill")
  quill.setAttribute("class", "hidden")

  // Show Content
  const noteContent = document.getElementById("theContent")
  noteContent.setAttribute("class", "visible")
}
function editNote(){
  // console.log("Edited")
  const editButton = document.getElementById("editButton");
  const saveButton = document.createElement("button");
  saveButton.setAttribute("class", "hover:bg-slate-500 h-full p-[3vh]")
  saveButton.setAttribute("id", "saveButton")
  saveButton.addEventListener("click", () => saveNote())
  saveButton.innerHTML = "Save"
  editButton.replaceWith(saveButton)

  //show quill editor
  const quill = document.getElementById("quill")
  quill.setAttribute("class", "visible")
  const noteContent = document.getElementById("theContent")
  noteContent.setAttribute("class", "hidden")
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



  return (
    <>
      <header className="flex flex-col text-center ">
          <div className="text-3xl font-bold" > <span className= "float-left">
            <button id="menuButton" onClick={hideNotes}>&#9776;</button>
            </span>Lotion</div>
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

        <div id="noteBar" className="col-span-5 h-[91vh]">
          <div id="noteInfo" className="bg-red-500 h-[9vh]"> 
            <div id="Title" className="text-3xl">
              <input id="noteTitle" className="border-2 placeholder:text-black outline-blue-500/0 bg-inherit border-blue-500/0 focus:outline-none" placeholder="Untitled"/>
              <div id= "noteButtons" className="text-xl float-right">

                <button id="saveButton" className="hover:bg-slate-500 h-full p-[3vh]" onClick={saveNote}>Save</button> 
                <button id="deleteButton"className="hover:bg-slate-500 p-[3vh]" onClick={deleteNote}>Delete</button>
              </div>
            </div>
            <div id="Time" className="text-sm">
              <input id="noteTime" type="datetime-local" className="bg-inherit"/>
              {/* <button onClick={formatDate}>Click for date here</button> */}
            </div>
          </div>
          <div id="content" className="h-[82vh]">
          {/* <h1>HelloWorld</h1> */}

          {/* child components get injected here and replace <Outlet /> */}
          {/* <Outlet /> */}
          <div>
            <ReactQuill id="quill" value={content} onChange={handleContentChange} />    
            <div id="theContent" className="hidden"/>
          </div>
        </div>
        </div>

      </div>
    </>
  )
}


export default Layout;
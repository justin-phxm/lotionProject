import { Outlet } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";


function Layout() {
  function stateInitial(){
    return ({count: 0, title: "Untitled", date: "", content: "..."})
}
  const [state, setState] = useState(() => stateInitial());
  const count = state.count
  const title = state.title
  const date = state.date
  const content = state.content

  function deleteNote(){
    if(count > 0){
      console.log("decrement State")
      const answer = window.confirm(`Are you sure you want to delete ${title}?`)  
      if(answer){
        const button = document.getElementById(`title${count}`)
        const separator = document.getElementById(`${count}Separator`)
        console.log((`title${count}`))
        button.remove()
        separator.remove()
        setState(prevState => ({...prevState, count: count - 1, title: `title${count - 1}`}))
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
  const itemContainer = []

  const data = {title: "myNote1", date:"October 31", content: "H:appy Halloween!"}
  const data2 = {title: "myNote2", date:"December 25", content: "Merry Christmas!"}

  localStorage.setItem('note1', JSON.stringify(data));
  localStorage.setItem('note2', JSON.stringify(data2))

  const item = JSON.parse(localStorage.getItem('note1'));
  const item2 = JSON.parse(localStorage.getItem('note2'));
  
  itemContainer.push(item)
  itemContainer.push(item2)

}

function alertInput(myInput){
alert(myInput)
}


const options = {
year: "numeric",
month: "long",
day: "numeric",
hour: "numeric",
minute: "numeric",
};

function formatDate(){
  // const time = Date.now()
  // console.log(time)
  const date = new Date().toLocaleString("en-US", options)
  // console.log(date)
  return date
}

  return (
    <>
      <header className="flex flex-col text-center h-[7vh]">
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

                <button id="saveButton" className="hover:bg-slate-500 rounded-none h-full p-[3vh]" onClick={saveNote}>Save</button> 
                <button id="deleteButton"className="hover:bg-slate-500 rounded-none p-[3vh]" onClick={deleteNote}>Delete</button>
              </div>
            </div>
            <div id="Time" className="text-sm">
              <input type="datetime-local" className="bg-inherit" onLoad={formatDate} placeholder="Hello World"/>
              <button onClick={formatDate}>Click for date here</button>
            </div>
          </div>
          <div id="content" className="h-[82vh]">
          {/* <h1>HelloWorld</h1> */}

          {/* child components get injected here and replace <Outlet /> */}
          <Outlet />
        </div>
        </div>

      </div>
    </>
  )
}


export default Layout;
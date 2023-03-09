import React from 'react'
import {useNavigate} from 'react-router-dom'
export default function Notes({note, setSelect, formattedDate}) {
  const navigate = useNavigate()
  function handleNoteClick(){
    console.log(note.id)
    setSelect(note.id)
    let theContent = document.getElementById("theContent")
    theContent.innerHTML = note.content
    document.getElementById("noteTitle").value = note.title
    document.getElementById("noteTime").value = note.date
    
    let editButton = document.getElementById("editButton")
    editButton.setAttribute("class", "visible hover:bg-slate-500 h-full p-[3vh]")
    let saveButton = document.getElementById("saveButton")
    saveButton.setAttribute("class", "hidden")
    // let noContent = document.getElementById("noContent")
    // noContent.setAttribute("class", "hidden")
    
    navigate(`/notes/${note.id}`)
  }
  let newFormatTime = formattedDate(note.date)

  // let contentElement = "<div>Hello World</div>"
  // let el = document.getElementById("contentElement")
  // el.innerHTML = contentElement
  // function Note({data}){
    // console.log(data.content)
    // let someVar = data.content
    // return <div>{someVar}</div>
    // let el = document.createElement("div")
    // el.innerHTML = data.content.toString()
    // console.log(el)
    // return el
  // }

  return (
      <div>
        <button id={note.id} onClick={handleNoteClick} className="flex flex-col w-full h-[10vh] bg-slate-500 hover:bg-slate-600 rounded-none text-white text-left">
          <div className="font-bold text-xl float-left">{note.title}</div>
          <div className="text-sm text-light float-left">{newFormatTime}</div>
          <div>{note.content}</div>
          {/* use ref??? */}
          {/* <div id="contentElement"> </div> */}
          {/* <Note data={note}/> */}
        </button>
        <div className="h-px bg-black"/>
      </div>
  )
}

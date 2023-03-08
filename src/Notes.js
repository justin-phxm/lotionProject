import React from 'react'

export default function Notes({note, setSelect}) {
  function handleNoteClick(){
    // selectNote(note.id)
    console.log(note.id)
    setSelect(note.id)
  }
  return (
      <div>
        <button id={note.id} onClick={handleNoteClick} className="flex flex-col w-full h-[10vh] bg-slate-500 hover:bg-slate-600 rounded-none text-white text-left">
          <div className="font-bold text-xl float-left">{note.title}</div>
          <div className="text-sm text-light float-left">{note.date}</div>
          <div>{note.content}</div>
        </button>
        <div className="h-px bg-black"/>
      </div>
  )
}

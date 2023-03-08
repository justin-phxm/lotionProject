import React from 'react'
import Notes from './Notes'

export default function NotesList({notes, setSelect}) {
    return (
        notes.map(note => {
            return <Notes key={note.id} note={note} setSelect={setSelect}/>
        })
  )
}

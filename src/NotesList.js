import React from "react";
import Notes from "./Notes";

export default function NotesList({ notes, setSelect, formattedDate }) {
  return (
    <div>
      {notes.length === 0 ? (
        <div>No Notes yet</div>
      ) : (
        <div className="flex flex-col gap-1">
          {notes.map((note) => (
            <Notes
              key={note.id}
              note={note}
              setSelect={setSelect}
              formattedDate={formattedDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

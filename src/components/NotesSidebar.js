import NotesList from "../NotesList";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { formattedDate } from "../lib/utils";
import { useState, useEffect } from "react";
export default function NotesSidebar(props) {
  const { notes, setNotes, setSelect, setShowEditor } = props.props;
  const navigate = useNavigate();
  const handleNewNote = () => {
    setShowEditor(true);
    const genID = uuidv4();
    setSelect(genID);
    setNotes((prevState) => {
      return [
        ...prevState,
        {
          id: genID,
          title: "Untitled",
          date: new Date().toISOString().slice(0, 16),
          content: "",
        },
      ];
    });
    navigate(`/notes/${genID}`);
  };
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  useEffect(() => {
    if (searchText === "") setFilteredNotes(notes);
    console.log(notes);
    const filteredNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredNotes(filteredNotes);
  }, [searchText, notes]);
  return (
    <div id="userNotes" className="col-span-1 bg-slate-200">
      <div
        id="addNotesBar"
        className="bg-slate-300 border-b flex flex-row justify-between px-4 font-bold text-xl">
        <div>Notes</div>
        <button
          id="newNote"
          className="text-xl hover:text-slate-500"
          onClick={handleNewNote}>
          +
        </button>
      </div>
      <div className="p-4 w-full">
        <input
          type="text"
          className="bg-inherit w-full p-2 border-b-2 border-slate-300"
          placeholder="Search for notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div id="notesContainer">
        <NotesList
          notes={filteredNotes}
          setSelect={setSelect}
          formattedDate={formattedDate}
        />
      </div>
    </div>
  );
}

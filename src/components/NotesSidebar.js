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
    <div id="userNotes" className="col-span-1 bg-slate-200 dark:bg-slate-900">
      <div
        id="addNotesBar"
        className="flex flex-row justify-between border-b bg-slate-300 px-4 text-xl font-bold dark:bg-slate-700"
      >
        <div>Notes</div>
        <button
          id="newNote"
          className="text-xl hover:text-slate-500"
          onClick={handleNewNote}
        >
          +
        </button>
      </div>
      <div className="w-full p-4">
        <input
          type="text"
          className="w-full border-b-2 border-slate-300 bg-inherit p-2"
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

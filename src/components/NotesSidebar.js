import NotesList from "../NotesList";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../lib/utils";
export default function NotesSidebar(props) {
  const {
    state,
    setState,
    noteTimeRef,
    setSelect,
    setShowEditor,
    formattedDate,
  } = props.props;
  const navigate = useNavigate();
  const handleNewNote = () => {
    setShowEditor(true);
    let genID = uuidv4();
    setSelect(genID);
    setState((prevState) => {
      return [
        ...prevState,
        {
          id: genID,
          title: "Untitled",
          date: formattedDate(formatDate()),
          content: "",
        },
      ];
    });
    noteTimeRef.current.value = formatDate();
    navigate(`/notes/${genID}`);
  };
  return (
    <div id="userNotes" className="col-span-1 bg-slate-200">
      <div id="addNotesBar" className="bg-slate-300 border-b font-bold text-xl">
        Notes
        <button
          id="newNote"
          className="text-xl float-right hover:bg-slate-500"
          onClick={handleNewNote}>
          +
        </button>
      </div>
      <div id="notesContainer">
        <NotesList
          notes={state}
          setSelect={setSelect}
          formattedDate={formattedDate}
        />
      </div>
    </div>
  );
}

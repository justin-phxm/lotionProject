import NotesList from "../NotesList";
export default function NotesSidebar(props) {
  const { state, setSelect, formattedDate, handleNewNote, emptyRef } =
    props.props;
  return (
    <div id="userNotes" className="col-span-1  bg-slate-200 h-[91vh]">
      <div id="addNotesBar" className="bg-slate-300 font-bold text-xl">
        Notes
        <button
          id="newNote"
          className="text-xl float-right hover:bg-slate-500"
          onClick={handleNewNote}>
          +
        </button>
      </div>
      <div className="h-px bg-slate-100" />
      <div id="notesContainer">
        <span ref={emptyRef} id="empty" className="font-light">
          No Note yet
        </span>
        <NotesList
          notes={state}
          setSelect={setSelect}
          formattedDate={formattedDate}
        />
      </div>
    </div>
  );
}

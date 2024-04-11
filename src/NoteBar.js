import React from "react";
import ReactQuill from "react-quill";
import EditorContext from "./EditorContext";
import { useContext } from "react";
export default function NoteBar(props) {
  const {
    notes,
    noteTitleRef,
    noteInfoRef,
    noteTimeRef,
    quillRef,
    theContentRef,
    handleSaveClick,
    editNote,
    handleDeleteNote,
    showEditor,
    selectedNoteID,
  } = props.props;
  const { editMode, setEditMode } = useContext(EditorContext);
  const selectedNote = notes.find((note) => note.id === selectedNoteID);
  const handleEditButton = () => {
    setEditMode(true);
    console.log(selectedNoteID);
    editNote(selectedNoteID);
  };
  const handleSaveButton = () => {
    setEditMode(false);
    handleSaveClick();
  };
  return (
    <div id="noteBar" className="col-span-5">
      <div className={showEditor ? " h-full flex flex-col" : "hidden"}>
        <div ref={noteInfoRef} id="noteInfo" className={" bg-slate-300"}>
          <div id="Title" className="text-3xl">
            <input
              ref={noteTitleRef}
              id="noteTitle"
              type="text"
              placeholder="Untitled"
              className="border-2 placeholder:text-black outline-blue-500/0 bg-inherit border-blue-500/0 focus:outline-none"
            />
            <div id="noteButtons" className="text-xl float-right">
              <button
                id="saveButton"
                className={
                  "hover:bg-slate-500 h-full p-4" + (editMode ? "" : " hidden")
                }
                onClick={handleSaveButton}>
                Save
              </button>
              <button
                id="editButton"
                className={
                  "hover:bg-slate-500 h-full p-4" + (editMode ? " hidden" : "")
                }
                onClick={handleEditButton}>
                Edit
              </button>
              <button
                id="deleteButton"
                className="hover:bg-slate-500 p-4"
                onClick={handleDeleteNote}>
                Delete
              </button>
            </div>
          </div>
          <div id="Time" className="text-sm">
            <input
              ref={noteTimeRef}
              id="noteTime"
              type="datetime-local"
              className="bg-inherit"
              defaultValue={selectedNote?.date}
            />
          </div>
        </div>
        <div id="content" className=" h-4/5">
          <ReactQuill
            id="quill"
            ref={quillRef}
            value={notes.content}
            placeholder="Your Note Here"
            className="h-full"
          />
          <div ref={theContentRef} id="theContent" className="hidden" />
        </div>
      </div>
      <div
        id="noContent"
        className={
          showEditor
            ? "hidden"
            : " text-center mt-56 text-xl font-light align-middle"
        }>
        Select a note, or create a new one.
      </div>
    </div>
  );
}

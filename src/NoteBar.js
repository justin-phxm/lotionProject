import React from "react";
import ReactQuill from "react-quill";
import EditorContext from "./EditorContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
export default function NoteBar(props) {
  const {
    notes,
    noteTitleRef,
    noteInfoRef,
    noteTimeRef,
    quillRef,
    handleDeleteNote,
    showEditor,
    selectedNoteID,
    saveNote,
  } = props.props;
  const { editMode, setEditMode } = useContext(EditorContext);
  const selectedNote = notes.find((note) => note.id === selectedNoteID);
  const navigate = useNavigate();
  const handleEditButton = () => {
    setEditMode(true);
    navigate(`/notes/${selectedNoteID}`);
  };
  const handleSaveButton = () => {
    setEditMode(false);
    saveNote(selectedNoteID);
  };

  return (
    <div id="noteBar" className="col-span-5">
      <div className={showEditor ? " h-full flex flex-col" : "hidden"}>
        <div ref={noteInfoRef} id="noteInfo" className={" bg-slate-300"}>
          <div id="Title" className="text-3xl flex flex-row justify-between">
            <input
              ref={noteTitleRef}
              id="noteTitle"
              type="text"
              placeholder="Untitled"
              className="border-2 placeholder:text-black outline-blue-500/0 bg-inherit border-blue-500/0 focus:outline-none w-full h-12"
              disabled={!editMode}
            />
            <div id="noteButtons" className="text-xl flex gap-4 flex-row px-4">
              <button
                id="saveButton"
                className={
                  "hover:bg-slate-500 h-full" + (editMode ? "" : " hidden")
                }
                onClick={handleSaveButton}>
                Save
              </button>
              <button
                id="editButton"
                className={
                  "hover:bg-slate-500 h-full" + (editMode ? " hidden" : "")
                }
                onClick={handleEditButton}>
                Edit
              </button>
              <button
                id="deleteButton"
                className="hover:bg-slate-500"
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
              disabled={!editMode}
            />
          </div>
        </div>
        <div id="content" className=" h-5/6">
          <ReactQuill
            id="quill"
            ref={quillRef}
            value={selectedNote?.content}
            placeholder="Your Note Here"
            className={"h-full" + (editMode ? "" : " hidden")}
          />
          <div
            id="theContent"
            className={editMode ? "hidden" : " overflow-x-hidden text-ellipsis"}
          />
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

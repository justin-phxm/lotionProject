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
      <div className={showEditor ? " flex h-full flex-col" : "hidden"}>
        <div
          ref={noteInfoRef}
          id="noteInfo"
          className={" bg-slate-300 dark:bg-slate-900"}
        >
          <div id="Title" className="flex flex-row justify-between text-3xl">
            <input
              ref={noteTitleRef}
              id="noteTitle"
              type="text"
              placeholder="Untitled"
              className="h-12 w-full border-2 border-blue-500/0 bg-inherit outline-blue-500/0 placeholder:text-black focus:outline-none"
              disabled={!editMode}
            />
            <div id="noteButtons" className="flex flex-row gap-4 px-4 text-xl">
              <button
                id="saveButton"
                className={
                  "h-full hover:text-slate-500" + (editMode ? "" : " hidden")
                }
                onClick={handleSaveButton}
              >
                Save
              </button>
              <button
                id="editButton"
                className={
                  "h-full hover:text-slate-500" + (editMode ? " hidden" : "")
                }
                onClick={handleEditButton}
              >
                Edit
              </button>
              <button
                id="deleteButton"
                className="hover:text-slate-500"
                onClick={handleDeleteNote}
              >
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
            : " mt-56 text-center align-middle text-xl font-light"
        }
      >
        Select a note, or create a new one.
      </div>
    </div>
  );
}

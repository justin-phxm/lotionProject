import React from "react";
import ReactQuill from "react-quill";

export default function NoteBar(props) {
  const {
    state,
    noteTitleRef,
    noteInfoRef,
    noteTimeRef,
    quillRef,
    noContentRef,
    theContentRef,
    handleSaveClick,
    handleEditClick,
    handleDeleteNote,
  } = props.props;
  return (
    <div id="noteBar" className="col-span-5 h-[91vh]">
      <div ref={noteInfoRef} id="noteInfo" className="hidden">
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
              className="hover:bg-slate-500 h-full p-[3vh]"
              onClick={handleSaveClick}>
              Save
            </button>
            <button
              id="editButton"
              className="hidden hover:bg-slate-500 h-full p-[3vh]"
              onClick={handleEditClick}>
              Edit
            </button>
            <button
              id="deleteButton"
              className="hover:bg-slate-500 p-[3vh]"
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
          />
        </div>
      </div>
      <div id="content" className="h-[65vh]">
        <div>
          <ReactQuill
            id="quill"
            ref={quillRef}
            value={state.content}
            placeholder="Your Note Here"
            className="hidden"
          />
          <div ref={theContentRef} id="theContent" className="hidden" />
          <div
            ref={noContentRef}
            id="noContent"
            className="h-[50vh] text-center mt-56 text-xl font-light align-middle">
            Select a note, or create a new one.
          </div>
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.js";
import Notes from "./Notes.js";
import NotesList from "./NotesList.js";

export default function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element = {<NotesList />} />
        <Route path="/notes/:notesID" element={<Notes />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
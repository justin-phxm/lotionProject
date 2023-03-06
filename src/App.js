import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useState } from "react";
import Layout from "./Layout.js";
// import About from "./About.js";
import Skills from "./Skills.js";
import Notes from "./Notes.js";
// import notes from "./notes.js";

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/notes" element={<Skills />} />
        {/* <Route path="/skills" element={<Skills />} /> */}
        {/* <Route path="/notes/:notesID" element={<Notes />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;

import React,  { useState } from 'react'
import { useParams } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function Notes() {
    return (
      <div>
          <ReactQuill id="quill" value={content} onChange={handleContentChange} />    
          <div id="theContent"/>
      </div>
  )
}

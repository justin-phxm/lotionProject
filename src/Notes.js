import React,  { useState } from 'react'
import { useParams } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function Notes() {
    const { notesID } = useParams();
    // notesID = "newNote"
    // const [content, setContent] = useState('');
    
    // const handleContentChange = (value) => {
    //     setContent(value);
    // };

    return (
        <div>Details about notes {notesID}</div>
    // <div>
    //     <ReactQuill value={content} onChange={handleContentChange} />    
    // </div>
  )
}

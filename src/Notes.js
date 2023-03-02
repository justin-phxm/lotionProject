import React,  { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function Notes() {
    const [content, setContent] = useState('');
    
    const handleContentChange = (value) => {
        setContent(value);
    };
    function newContent(){
        document.getElementById("theContent").innerHTML = content;
    }
    return (

    <div>
        <ReactQuill value={content} onChange={handleContentChange} />    
        <div>
            <button onClick={newContent}>Save</button>
            <div id="theContent"/>
        </div>

    </div>
    
  )
}

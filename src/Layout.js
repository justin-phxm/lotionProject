import { Outlet } from "react-router-dom";
// import { newNote } from "./myFunctions.js";
function hideNotes(){
    alert("Hide Notes");
}
function newNote(){
    alert("New Note");
}

function saveNote(){
    const itemContainer = []

    const data = {title: "myNote1", date:"October 31", content: "H:appy Halloween!"}
    const data2 = {title: "myNote2", date:"December 25", content: "Merry Christmas!"}

    localStorage.setItem('note1', JSON.stringify(data));
    localStorage.setItem('note2', JSON.stringify(data2))

    const item = JSON.parse(localStorage.getItem('note1'));
    const item2 = JSON.parse(localStorage.getItem('note2'));
    
    itemContainer.push(item)
    itemContainer.push(item2)
    

/*
HTML Injection Method is not working.
CSS does not apply to the injected HTML.
Arrow functions are not working in the injected HTML.

May need to look into states and props.


    let htmlInjection = ""
    for(let i = 0; i < itemContainer.length; i++){
        
      //   htmlInjection += `
      //   <div className="focus:bg-slate-600 focus:text-white">
      //     <button className="hover:bg-slate-500 w-full" onClick={() => alertInput(${i})}>
      //       <div className="font-bold text-2xl float-left">${itemContainer[i].title}</div>
      //       <div className="text-sm text-neutral-500 text-light float-left">${itemContainer[i].date}</div>
      //       <div className="float-left">${itemContainer[i].content}</div>
      //     </button>
      //   </div>
      // <div className="h-px bg-slate-100"/>`
        htmlInjection += `
        <div className="focus:bg-slate-600 focus:text-white">
          <button className="hover:bg-slate-500 w-full">
            <div className="font-bold text-2xl float-left">${itemContainer[i].title}</div>
            <div className="text-sm text-neutral-500 text-light float-left">${itemContainer[i].date}</div>
            <div className="float-left">${itemContainer[i].content}</div>
          </button>
        </div>
      <div className="h-px bg-slate-100"/>`

    }

    document.getElementById("notesContainer").innerHTML = htmlInjection
*/

}
function deleteNote(){
  const answer = window.confirm("Are you sure?");
  if (answer) {
    // deleteNote(noteId);
    alert("Note Deleted");
  }
}

// function handleInput(e) {
//   console.log(e.target.value)
// }

function alertInput(myInput){
  alert(myInput)
}


const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const formatDate = (when) => {
  const formatted = new Date(when).toLocaleString("en-US", options);
  if (formatted === "Invalid Date") {
      return "";
  }
  console.log(formatted)
  return formatted;
};

function Layout() {
  return (
    <>
      <header className="flex flex-col text-center h-[9vh]">
          <div className="text-3xl font-bold" > <span className= "float-left">
            <button id="menuButton" onClick={hideNotes}>&#9776;</button>
            </span>Lotion</div>
          <div>Like Notion, but worse.</div>
          <div className="h-0.5 bg-slate-100"></div>
      </header>
      <div id="hero" className=" grid grid-cols-6 gap-1 ">
        <div id="userNotes" className="col-span-1  bg-slate-200 h-[91vh]">
          <div id="addNotesBar" className="bg-slate-300 font-bold text-xl">
            Notes
            <button id="newNote" className="text-xl float-right" onClick={newNote}>+</button>
          </div>
          <div className="h-px bg-slate-100"/>
          <div id="notesContainer">
            <div className="focus:bg-slate-600 focus:text-white">
              <button className="hover:bg-slate-500 w-full" onClick={() => alertInput(1)}>
                <div className="font-bold text-2xl float-left">Untitled</div>
                <div className="text-sm text-neutral-500 text-light float-left">January 1, 2021, 12:00:00 AM</div>
                <div className="float-left">HelloWorld</div>
              </button>
            </div>
            <div className="h-px bg-slate-100"></div>

          </div>
        </div>

        <div id="noteBar" className="col-span-5 h-[91vh]">
          <div id="noteInfo" className="bg-red-500 h-[9vh]"> 
            <div id="Title" className="text-3xl">
              <input id="noteTitle" className="border-2 placeholder:text-black outline-blue-500/0 bg-inherit border-blue-500/0 focus:outline-none" placeholder="Untitled"/>
              <div id= "noteButtons" className="text-xl float-right">
                <button id="saveButton" className="hover:bg-slate-500 rounded-none h-full" onClick={saveNote}>Save</button> 
                <button id="deleteButton"className="hover:bg-slate-500 rounded-none" onClick={deleteNote}>Delete</button>
              </div>
            </div>
            <div id="Time" className="text-sm">
              <input type="datetime-local" className="bg-inherit" onLoad={formatDate}/>
            </div>
          </div>
          <div id="content" className="h-[82vh]">
          {/* <h1>HelloWorld</h1> */}

          {/* child components get injected here and replace <Outlet /> */}
          <Outlet />
        </div>
        </div>

      </div>
    </>
  )
}


export default Layout;
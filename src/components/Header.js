export default function Header() {
  function hideNotes() {
    let userNotes = document.getElementById("userNotes");
    let noteBar = document.getElementById("noteBar");
    if (userNotes.style.display === "none") {
      userNotes.style.display = "block";
      noteBar.setAttribute("class", "col-span-5");
    } else {
      userNotes.style.display = "none";
      noteBar.setAttribute("class", "col-span-6");
    }
  }
  return (
    <header className="flex relative flex-col text-center justify-center border-b ">
      <div className="text-3xl font-bold">
        <button
          className="float-left absolute left-0 top-0"
          id="menuButton"
          onClick={hideNotes}>
          &#9776;
        </button>
        <a href="/">Lotion</a>
      </div>
      <div>Like Notion, but worse.</div>
    </header>
  );
}

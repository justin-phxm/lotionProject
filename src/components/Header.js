export default function Header({ hideNotes }) {
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

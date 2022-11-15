function NavButton(props) {
  return (
    <button className="App-Nav-Element" onClick={props.onClick}>
      {props.content}
    </button>
  );
}

export default NavButton;
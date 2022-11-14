function NavButton(props) {
  return (
    <button className="App-Nav-Element" onClick={props.onClick} name={props.name}>
      {props.content}
    </button>
  );
}

export default NavButton;
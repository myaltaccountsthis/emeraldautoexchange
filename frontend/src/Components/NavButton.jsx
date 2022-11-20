function NavButton(props) {
  return (
    <button className={["App-Nav-Element"].concat(props.className).join(' ')} onClick={props.onClick}>
      {props.content}
    </button>
  );
}

export default NavButton;
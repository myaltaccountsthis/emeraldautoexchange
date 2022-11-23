import React from 'react';
import {ReactComponent as SearchIcon} from '../magnifying-glass.svg';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.onEnter = props.onEnter;
  }

  onFocusEvent(bool) {
    return () => this.setState({ focused: bool });
  }

  getFocusedName(className) {
    return [className].concat(this.state.focused ? "focused" : "").join(" ")
  }

  render() {
    return (
      <div className={this.getFocusedName("Search-Bar")}>
        <SearchIcon style={{ maxHeight: "32px" }} />
        <input className={this.getFocusedName("Search-Text")} type="text" onFocus={this.onFocusEvent(true)} onBlur={this.onFocusEvent(false)} onKeyUp={this.onEnter} />
      </div>
    );
  }
}

export default SearchBar
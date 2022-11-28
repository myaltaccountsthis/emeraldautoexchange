import React from 'react';
import {ReactComponent as SearchIcon} from '../magnifying-glass.svg';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.onEnter = props.onEnter;
    this.filterToggle = props.filterToggle;
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
        <SearchIcon width="32px" height="32px" />
        <input className={this.getFocusedName("Search-Text")} type="text" onFocus={this.onFocusEvent(true)} onBlur={this.onFocusEvent(false)} onKeyUp={this.onEnter} />
        <button className="Listings-Filter-Button" onClick={this.filterToggle}>
          <img src="filter.svg" alt="Filter"></img>
        </button>
      </div>
    );
  }
}

export default SearchBar
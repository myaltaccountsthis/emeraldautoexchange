import React from 'react';
import ListingsElement from '../Components/ListingsElement';
import SearchBar from '../Components/SearchBar';
import './Listings.css';

class Listings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      search: "",
      filter: "",
      page: 0
    };
  }

  getListings() {
    // TODO change this
    // TODO need filter on right side of Search-Text inside the Search-Bar flexbox
    const matches = [];
    if (matches.length === 0)
    return (
      <div>There are no cars that match your search</div>
    );
    return matches.map(<ListingsElement />);
  }

  onEnter(event) {
    if (event.key === "Enter") {
      console.log("Entered " + event.target.value);
    }
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header">Our Inventory</div>
        <br />
        <div style={{ marginBottom: "36px" }}>
          <SearchBar onEnter={this.onEnter.bind(this)} />
        </div>
        <div style={{ margin: "auto 20px" }}>
          <div className="Listings-Container">
            {
              this.getListings()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Listings;
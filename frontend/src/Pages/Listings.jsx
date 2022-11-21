import React from 'react';
import ListingsElement from '../Components/ListingsElement';
import './Listings.css';

class Listings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      filter: "",
      page: 0
    };
  }

  getListings() {
    // TODO change this
    const matches = [];
    if (matches.length === 0)
    return (
      <div>There are no cars that match your search</div>
    );
    return matches.map(<ListingsElement />);
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header">Our Inventory</div>
        <br />
        <div style={{ marginBottom: "36px" }}>
          <input className="Search-Bar" type="text"></input>
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
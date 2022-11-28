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
      filterMenu: false,
      page: 0
    };
  }

  getListings() {
    // TODO change this
    // TODO need filter on right side of Search-Text inside the Search-Bar flexbox
    // TODO loading three dots
    // const matches = [];
    let matches = [
      {
        year: "2003",
        make: "ford",
        model: "f150",
        miles: 39273,
        condition: 4,
        price: 13432
      }
    ];
    matches = matches.map(item => {
      item.name = [item.year, item.make, item.model].join(" ");
      item.key = [item.name, item.miles].join(" ");
      return item;
    }).filter(item => item.name.toLowerCase().includes(this.state.search));

    if (matches.length === 0)
      return (
        <div className="Listings-None">There are no cars that match your search</div>
      );
    return matches.map(item => <ListingsElement key={item.key} item={item} />);
  }

  onEnter(event) {
    if (event.key === "Enter") {
      this.setState({ search: event.target.value.toLowerCase() });
    }
  }

  getFilterMenu() {
    if (!this.state.filterMenu)
      return;
    return (
      <div className="Listings-Filter-Menu">
        <br />
      </div>
    );
  }

  toggleFilterMenu() {
    this.setState({ filterMenu: !this.state.filterMenu });
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header">Our Inventory</div>
        <br />
        <div style={{ marginBottom: "40px" }}>
          <SearchBar onEnter={this.onEnter.bind(this)} filterToggle={this.toggleFilterMenu.bind(this)} />
        </div>
        {
          this.getFilterMenu()
        }
        <div style={{ margin: "auto 20px" }}>
          <div className="Listings-Container">
            {
              this.getListings()
            }
          </div>
          <div className="Listings-Nav-Container">
            <button className="Listings-Nav-Button">L</button>
            <div>1 ... 3 4 5 ... 10</div>
            <button className="Listings-Nav-Button">R</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Listings;
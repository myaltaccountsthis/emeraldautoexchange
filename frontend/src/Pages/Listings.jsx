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
      page: 0,
      selectedMake: "",
    };
    this.models = {
      "": [ "Select a Make" ],
      "Chevrolet": [ "Malibu", "Equinox", "Tahoe", "Silverado", "Suburban" ],
      "Ford": [ "Escape", "Bronco", "Explorer", "F-150", "Expedition" ],
      "Honda": [ "CR-V", "Civic", "Accord", "Odyssey", "Pilot" ],
      "Toyota": [ "Corolla", "Camry", "Prius", "Tacoma", "Highlander" ],
    };
    this.builds = [ "Car", "SUV", "Minivan", "Truck" ];
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
        <div className="Listings-Filter-Row">
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="make" className="Listings-Filter-Element">Make</label><br />
            <select name="make" className="Listings-Filter-Element" required>
              {
                Object.keys(this.models).map((make) => <option className="Listings-Filter-Element" key={make} value={make}>{make}</option>)
              }
            </select>
          </div>
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="model" className="Listings-Filter-Element">Model</label><br />
            <select name="model" className="Listings-Filter-Element" required>
              {
                this.models[this.state.selectedMake].map((model) => <option className="Listings-Filter-Element" key={model} value={model}>{model}</option>)
              }
            </select>
          </div>
        </div>
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
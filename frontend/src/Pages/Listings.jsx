import React from 'react';
import ListingsElement from '../Components/ListingsElement';
import SearchBar from '../Components/SearchBar';
import './Listings.css';
import {ReactComponent as ArrowL} from '../arrowL.svg';
import {ReactComponent as ArrowR} from '../arrowR.svg';
import NavThreeDots from '../Components/NavThreeDots';

class Listings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      selectedMake: "",
      data: null,
      success: false
    };
    this.backendUrl = props.backendUrl;
    this.models = {
      "": [ "" ],
      "Chevrolet": [ "", "Equinox", "Malibu", "Silverado", "Suburban", "Tahoe" ],
      "Ford": [ "", "Bronco", "Escape", "Expedition", "Explorer", "F-150" ],
      "Honda": [ "", "Accord", "Civic", "CR-V", "Odyssey", "Pilot" ],
      "Toyota": [ "", "Camry", "Corolla", "Highlander", "Sienna", "Tacoma" ],
    };
    this.builds = [ "", "Car", "SUV", "Minivan", "Truck" ];
    // how many pages from the current page to show numbers for (e.g. if page = 5 and pageNumberExtent = 2, show 1 ... 3 4 5 6 7 ... total)
    this.pageNumberExtent = 2;
    this.filterIds = [ "makes", "models", "builds", "min_year", "max_year", "min_miles", "max_miles", "min_price", "max_price" ];

    // search info
    this.search = "";
    this.filter = "";
    this.currentQuery = null;
    this.page = 0;
    this.totalPages = 0;
    this.itemsPerPage = 30;
  }

  componentDidMount() {
    this.getListings();
    this.toggleFilterMenu(false);
  }

  updateFilter() {
    this.filter = this.filterIds.map(id => document.getElementById(id)).filter(element => element.value.length > 0).map(element => element.id + "=" + element.value).join("&");
  }

  // will set data to null when fetching, then set data
  // will also set currentQuery
  // basically an update method for the search
  async getListings(keepNav) {
    // TODO change this
    // TODO need filter on right side of Search-Text inside the Search-Bar flexbox
    // TODO loading three dots
    
    // query for this.currentQuery to compare
    // placeholder for now
    let query = `${this.backendUrl}/inventory?query=${this.search}&page=${(this.page + 1)}&count=${this.itemsPerPage}`;
    this.updateFilter();
    if (this.filter.length > 0)
      query += "&" + this.filter;
    query = encodeURI(query);
    if (query === this.currentQuery && this.state.success)
      return;

    this.currentQuery = query;
    if (!keepNav)
      this.totalPages = 0;
    this.setState({ data: null, success: false });
    
    let success = false;
    let data;
    try {
      const response = JSON.parse(await ((await fetch(query).catch("Failed to load data")).text()));
      this.totalPages = response.totalPages;

      let matches = response.data;
      matches = matches.map((item, index) => {
        item.name = [item.year, item.make, item.model].join(" ");
        item.key = [item.name, item.miles, index].join(" ");
        item.imageUrl = `cars/${item.make}_${item.model}.jpg`.toLowerCase();
        return item;
      });

      if (matches.length === 0) {
        this.page = 0;
        data = (
          <div className="Listings-None">There are no cars that match your search</div>
        );
      }
      else {
        data = matches.map(item => <ListingsElement key={item.key} item={item} />);
        success = true;
      }
    }
    catch (e) {
      data = <div className="Listings-None">Error loading data.</div>
    }
    
    if (query === this.currentQuery)
      this.setState({ data: data, success: success });
  }

  updateSearch(event) {
    this.search = event.target.value.toLowerCase();
  }

  onEnter(event) {
    if (event.key === "Enter") {
      this.newSearch();
    }
  }

  newSearch() {
    this.page = 0;
    this.getListings();
  }

  updateModel(event) {
    this.setState({ selectedMake: event.target.value }, () => this.newSearch());
  }

  onFilterInput(event) {
    const target = event.target;
    target.value = target.value.replaceAll(/[^0-9]/g, "");
  }

  getFilterMenu() {
    return (
      <div className="Listings-Filter-Menu">
        <div className="Listings-Filter-Row">
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="make" className="Listings-Filter-Element">Make</label><br />
            <select id="makes" name="make" className="Listings-Filter-Element" onChange={this.updateModel.bind(this)} required>
              {
                Object.keys(this.models).map(make => <option className="Listings-Filter-Element" key={make} value={make}>{make}</option>)
              }
            </select>
          </div>
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="model" className="Listings-Filter-Element">Model</label><br />
            <select id="models" name="model" className="Listings-Filter-Element" onChange={this.newSearch.bind(this)} required>
              {
                this.models[this.state.selectedMake].map(model => <option className="Listings-Filter-Element" key={model} value={model}>{model}</option>)
              }
            </select>
          </div>
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="build" className="Listings-Filter-Element">Build</label><br />
            <select id="builds" name="build" className="Listings-Filter-Element" onChange={this.newSearch.bind(this)} required>
              {
                this.builds.map(build => <option className="Listings-Filter-Element" key={build} value={build}>{build}</option>)
              }
            </select>
          </div>
        </div>
        <div className="Listings-Filter-Row">
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="year" className="Listings-Filter-Element">Year</label><br />
            <div className="Listings-Filter-Compare-Row">
              <div className="Listings-Filter-Set">
                <div className="Listings-Filter-Element Small-Font">Min</div>
                <input type="text" id="min_year" name="minyear" className="Listings-Filter-Element" maxLength="8" onInput={this.onFilterInput} onBlur={this.newSearch.bind(this)} onKeyUp={this.onEnter.bind(this)} required /><br />
              </div>
              <div className="Listings-Filter-Set">
                <div className="Listings-Filter-Element Small-Font">Max</div>
                <input type="text" id="max_year" name="maxyear" className="Listings-Filter-Element" maxLength="8" onInput={this.onFilterInput} onBlur={this.newSearch.bind(this)} onKeyUp={this.onEnter.bind(this)} required /><br />
              </div>
            </div>
          </div>
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="mile" className="Listings-Filter-Element">Mileage</label><br />
            <div className="Listings-Filter-Compare-Row">
              <div className="Listings-Filter-Set">
                <div className="Listings-Filter-Element Small-Font">Min</div>
                <input type="text" id="min_miles" name="minmile" className="Listings-Filter-Element" maxLength="8" onInput={this.onFilterInput} onBlur={this.newSearch.bind(this)} onKeyUp={this.onEnter.bind(this)} required /><br />
              </div>
              <div className="Listings-Filter-Set">
                <div className="Listings-Filter-Element Small-Font">Max</div>
                <input type="text" id="max_miles" name="maxmile" className="Listings-Filter-Element" maxLength="8" onInput={this.onFilterInput} onBlur={this.newSearch.bind(this)} onKeyUp={this.onEnter.bind(this)} required /><br />
              </div>
            </div>
          </div>
          <div className="Listings-Filter-Row-Element">
            <label htmlFor="price" className="Listings-Filter-Element">Price</label><br />
            <div className="Listings-Filter-Compare-Row">
              <div className="Listings-Filter-Set">
                <div className="Listings-Filter-Element Small-Font">Min</div>
                <input type="text" id="min_price" name="minprice" className="Listings-Filter-Element" maxLength="8" onInput={this.onFilterInput} onBlur={this.newSearch.bind(this)} onKeyUp={this.onEnter.bind(this)} required /><br />
              </div>
              <div className="Listings-Filter-Set">
                <div className="Listings-Filter-Element Small-Font">Max</div>
                <input type="text" id="max_price" name="maxprice" className="Listings-Filter-Element" maxLength="8" onInput={this.onFilterInput} onBlur={this.newSearch.bind(this)} onKeyUp={this.onEnter.bind(this)} required /><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getLoadingPlaceholder() {
    return (
      <div className="Listings-Placeholder">
        Loading...
      </div>
    );
  }

  addNoDuplicates(arr, number) {
    if (number < 0 || number >= this.totalPages || arr.includes(number)) {
      return;
    }
    arr.push(number);
  }

  getNavContainer() {
    const pageNumbers = [];
    let leftButton = true;
    let rightButton = true;
    let elements = [];
    if (this.page === 0)
      leftButton = false;
    if (this.page === this.totalPages - 1)
      rightButton = false;
    if (this.totalPages === 0) {
      leftButton = false;
      rightButton = false;
    }
    else {
      this.addNoDuplicates(pageNumbers, 0);
      this.addNoDuplicates(pageNumbers, this.totalPages - 1);
      const left = this.page - this.pageNumberExtent, right = this.page + this.pageNumberExtent;
      for (let i = left; i <= right; i++) {
        this.addNoDuplicates(pageNumbers, i);
      }
      pageNumbers.sort((a, b) => a - b);
      elements = pageNumbers.map(n => <button className={"Listings-Nav-Button Button-Background" + (n === this.page ? " Listings-Nav-Button-Current" : "")} key={n} onClick={() => this.navigatePage(n)}>{n + 1}</button>);
      if (left > 0) {
        elements.splice(pageNumbers.indexOf(left), 0, <NavThreeDots key="left" />);
        pageNumbers.splice(pageNumbers.indexOf(left), 0, left - 1);
      }
      if (right < this.totalPages - 1) {
        elements.splice(pageNumbers.indexOf(right) + 1, 0, <NavThreeDots key="right" />);
      }
    }
    return (
      <div className="Listings-Nav-Container">
        <button className={"Listings-Nav-Button Button-Background" + (leftButton ? " visible" : " invisible")} onClick={() => this.navigatePage(this.page - 1)}>
          <ArrowL />
        </button>
        <div className="Listings-Nav-Numbers">
          {elements}
        </div>
        <button className={"Listings-Nav-Button Button-Background" + (rightButton ? " visible" : " invisible")} onClick={() => this.navigatePage(this.page + 1)}>
          <ArrowR />
        </button>
      </div>
    );
  }

  navigatePage(newPage) {
    if (newPage < 0 || newPage >= this.totalPages)
      return;
    
    this.page = newPage;
    this.getListings(true);
  }

  toggleFilterMenu(show) {
    const element = document.getElementsByClassName("Listings-Filter-Outer")[0];
    if (show !== true && show !== false)
      show = element.style.maxHeight;
    if (show)
      element.style.maxHeight = "";
    else
      element.style.maxHeight = "0px";
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header">Our Inventory</div>
        <br />
        <div className="Listings-Description">We have a great selection of cars for you to choose from. It is our pleasure to provide you with the best car for you from our selection.</div>
        <br />
        <div style={{ marginBottom: "40px" }}>
          <SearchBar onEnter={this.onEnter.bind(this)} newSearch={this.newSearch.bind(this)} updateSearch={this.updateSearch.bind(this)} filterToggle={this.toggleFilterMenu.bind(this)} />
        </div>
        <div className="Listings-Filter-Outer">
          {
            this.getFilterMenu()
          }
        </div>
        <div style={{ margin: "auto 20px" }}>
          {this.getNavContainer()}
          <div className="Listings-Container">
            {
              (() => {
                if (this.state.data != null) {
                  return this.state.data;
                }
                return this.getLoadingPlaceholder();
              })()
            }
          </div>
        </div>
        <div style={{ height: "10em" }} />
      </div>
    );
  }
}

export default Listings;
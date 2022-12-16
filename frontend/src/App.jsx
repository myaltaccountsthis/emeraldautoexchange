import React from 'react';
import './App.css';
import NavButton from './Components/NavButton';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Listings from './Pages/Listings';
import {ReactComponent as Logo} from './emerald.svg';

class App extends React.Component {
  constructor(props) {
    super(props);

    
    let current = window.sessionStorage.getItem("current");
    if (!current)
    window.sessionStorage.setItem("current", current = "Home");
    this.state = {
      currentTab: current,
      useNavMenu: false
    };
    try {
      this.config = require('./config.json');
    }
    catch (e) {
      this.config = require('./config.json.example');
    }
    this.backendUrl = this.config.backendUrl;
    const homeComponent = <Home />;
    this.navInfo = {
      "Home": {component: homeComponent},
      "HomeTab": {title: "Home", component: homeComponent},
      "Listings": {title: "Car Listings", component: <Listings backendUrl={this.backendUrl} />},
      "Support": {title: "Contact Us", component: <Contact backendUrl={this.backendUrl} />}
    };
  }

  componentDidUpdate() {
    window.sessionStorage.setItem("current", this.state.currentTab);
  }

  handleOnClick(name) {
    return () => this.setState({currentTab: name});
  }

  toggleMenu() {
    const element = document.getElementById("App-Nav-Main");
    if (element.style.maxHeight)
      element.style.maxHeight = "";
    else
      element.style.maxHeight = "0px";
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <div className="App-Nav">
            <NavButton content={<Logo className="App-Nav-Button-svg" />} onClick={this.handleOnClick("Home")} className="Med-Screen" />
            <NavButton className="App-Nav-Menu-Button" content={<img src="hamburgerbutton.png" alt="Menu" style={{ height: "40px" }} />} onClick={this.toggleMenu} />
            <div className="Med-Screen" style={{ flexGrow: 2 }} />
            <NavButton content={<Logo className="App-Nav-Button-svg" />} onClick={this.handleOnClick("Home")} className="App-Nav-Center-Icon" />
            <div className="App-Nav-Main" id="App-Nav-Main">
              {
                /*
                (() => { // create NavButtons using object and insert NavDividers in between
                  let arr = Object.keys(this.navInfo).slice(1).map(key => <NavButton key={key} content={this.navInfo[key].title} onClick={this.handleOnClick(key)} />).reduce((r, a) => r.concat(a, <NavDivider />), []);
                  arr.pop();
                  return arr;
                })()
                */
                Object.keys(this.navInfo).slice(1).map(key => <NavButton key={key} content={this.navInfo[key].title} onClick={this.handleOnClick(key)} />)
              }
            </div>
            <div className="Med-Screen" style={{ flexGrow: 1, maxWidth: "50px" }} />
          </div>
        </header>
        <div style={{height: "30px"}} />
        {this.navInfo[this.state.currentTab].component}
      </div>
    );
  }
}

export default App;
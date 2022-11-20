import React from 'react';
import './App.css';
import NavButton from './Components/NavButton';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Listings from './Pages/Listings';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "Home",
      useNavMenu: false
    };
    const homeComponent = <Home />;
    this.navInfo = {
      "Home": {component: homeComponent},
      "HomeTab": {title: "Home", component: homeComponent},
      "Listings": {title: "Car Listings", component: <Listings />},
      "Support": {title: "Contact Support", component: <Contact />}
    };
  }

  handleOnClick(name) {
    return () => this.setState({currentTab: name});
  }

  toggleMenu() {
    const element = document.getElementById("App-Nav-Main");
    if (element.style.display)
      element.style.display = "";
    else
      element.style.display = "flex";
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <div className="App-Nav">
            <NavButton content={<img src="emerald.png" alt="Emerald Auto" className="App-Nav-Button-Img" />} onClick={this.handleOnClick("Home")} className="Med-Screen" />
            <NavButton className="App-Nav-Menu-Button" content={<img src="hamburgerbutton.png" alt="Menu" style={{ height: "40px" }} />} onClick={this.toggleMenu} />
            <div className="Med-Screen" style={{ flexGrow: 2 }} />
            <NavButton content={<img src="emerald.png" alt="Emerald Auto" className="App-Nav-Button-Img" />} onClick={this.handleOnClick("Home")} className="App-Nav-Center-Icon" />
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
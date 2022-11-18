import React from 'react';
import './App.css';
import NavButton from './NavButton';
import NavDivider from './NavDivider';
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
  
  render() {
    return (
      <div className="App">
        <header>
          <div className="App-Nav">
            <NavButton content={<img src="emerald.png" alt="Emerald Auto" style={{ height: "120px" }} />} onClick={this.handleOnClick("Home")} />
            <div style={{flexGrow: 2}} />
            {
              (() => { // create NavButtons using object and insert NavDividers in between
                let arr = Object.keys(this.navInfo).slice(1).map(key => <NavButton key={key} content={this.navInfo[key].title} onClick={this.handleOnClick(key)} />).reduce((r, a) => r.concat(a, <NavDivider />), []);
                arr.pop();
                return arr;
              })()
            }
            <div style={{flexGrow: 1, maxWidth: "50px"}} />
            <div className="App-Nav-Menu-Button">
              {
                // HAMBURGER BUTTON GOES HERE
              }
            </div>
          </div>
        </header>
        <div style={{height: "30px"}} />
        {this.navInfo[this.state.currentTab].component}
      </div>
    );
  }
}

export default App;
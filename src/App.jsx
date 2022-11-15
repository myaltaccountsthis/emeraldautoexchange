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
    this.navInfo = {
      "Home": {component: <Home />},
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
            <NavButton name="Home" content={<img src="./logo.png" alt="Emerald Auto" />} onClick={this.handleOnClick("Home")} />
            <div style={{flexGrow: 10}} />
            {
              (() => { // create NavButtons using object and insert NavDividers in between
                let arr = Object.keys(this.navInfo).slice(1).map(key => <NavButton name={key} key={key} content={this.navInfo[key].title} onClick={this.handleOnClick(key)} />).reduce((r, a) => r.concat(a, <NavDivider />), []);
                arr.pop();
                return arr;
              })()
            }
            <div style={{flexGrow: 1}} />
          </div>
        </header>
        <br />
        {this.navInfo[this.state.currentTab].component}
      </div>
    );
  }
}

export default App;
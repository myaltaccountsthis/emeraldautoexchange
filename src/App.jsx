import React from 'react';
import './App.css';
import NavButton from './NavButton';
import NavDivider from './NavDivider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "Home",
      useNavMenu: false
    };
    this.navInfo = {
      "Listings": "Car Listings",
      "Even more stuff": "Lots of stuff coming this way lol"
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
                let arr = Object.keys(this.navInfo).map(key => <NavButton name={key} content={this.navInfo[key]} onClick={this.handleOnClick(key)} />).reduce((r, a) => r.concat(a, <NavDivider />), []);
                arr.pop();
                return arr;
              })()
            }
            <div style={{flexGrow: 1}} />
          </div>
        </header>
        Current Tab: {this.state.currentTab}
      </div>
    );
  }
}

export default App;
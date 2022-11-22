import React from 'react';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    };
    this.images = ["emerald.png", "emeraldicon.png", "logo.png"];
  }

  componentDidMount() {
    this.images.forEach(image => new Image().src = image);
  }

  setImage(i) {
    this.setState({ currentImage: i});
  }

  changeImage(delta) {
    this.setImage((this.state.currentImage + 3 + delta) % 3);
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header-Row">
          <div className="App-Header">Welcome to Emerald Auto Exchange</div><br />
          <div className="Home-Tagline">Finer Cars for Finer People</div>
        </div>
        <br />
        <div className="Info-Row" style={{ backgroundColor: "rgb(192, 248, 215)" }}>
          <div className="Home-Image-Row">
            <button className="Home-Image-Arrow" onClick={() => this.changeImage(-1)}>
              <img src="arrowL.png" alt="Left"></img>
            </button>
            <img src={this.images[this.state.currentImage]} alt="Car"></img>
            <button className="Home-Image-Arrow" onClick={() => this.changeImage(1)}>
              <img src="arrowR.png" alt="Right"></img>
            </button>
          </div>
          <div>
            {
              this.images.map((_, index) => <button className={"Home-Image-Button " + (this.state.currentImage === index ? "Home-Image-Button-Active" : "")} key={index} onClick={() => this.setImage(index)} />)
            }
          </div>
        </div>
        <div className="Info-Row">
          <br />
          <div className="App-Header">About Us</div>
          <br />
          <div className="Home-About-Text">
            Emerald Auto Exchange was created to give customers used cars for the price they are worth.
            We strive to keep prices fair for our many cars of various conditions.
            Our wide selection of used cars will ensure that you can find the right car for the right price.
          </div>
          <br />
        </div>
        <div className="Info-Row" style={{ backgroundColor: "rgb(192, 248, 215)" }}>

        </div>
        <div className="Info-Row">

        </div>
      </div>
    );
  }
}

export default Home;
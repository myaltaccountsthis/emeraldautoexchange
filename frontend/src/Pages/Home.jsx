import React from 'react';
import './Home.css';
import {ReactComponent as ArrowL} from '../arrowL.svg';
import {ReactComponent as ArrowR} from '../arrowR.svg';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    };
    this.imageAnimation = 0;
    this.images = ["emerald.png", "emeraldicon.png", "logo.png"];
    this.handleOnClick = props.handleOnClick;
  }

  componentDidMount() {
    this.images.forEach(image => new Image().src = image);
  }

  setImage(i) {
    this.setState({ currentImage: i});
  }

  setImageIndex(i) {
    this.imageAnimation = i - this.state.currentImage;
    this.setImage(i);
  }

  changeImage(delta) {
    this.imageAnimation = delta;
    this.setImage((this.state.currentImage + this.images.length + delta) % this.images.length);
  }

  getImageAnimationClass() {
    if (this.imageAnimation > 0)
      return "Animate-Right hidden";
    if (this.imageAnimation < 0)
      return "Animate-Left hidden";
    return "hidden";
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header-Row">
          <div className="App-Header">Welcome to Emerald Auto Exchange</div><br />
          <div className="App-Secondary">Finer Cars for Finer People</div><br />
        </div>
        <div className="Info-Row" style={{ backgroundColor: "rgb(192, 248, 215)", height: "600px" }}>
          <div className="Home-Image-Row">
            <button className="Home-Image-Arrow Button-Background" onClick={() => this.changeImage(-1)}>
              <ArrowL />
            </button>
            {
              this.images.map((image, index) => <img key={index} className={this.getImageAnimationClass()} src={image} alt="Car" style={{ display: this.state.currentImage === index ? "block" : "" }} />)
            }
            <button className="Home-Image-Arrow Button-Background" onClick={() => this.changeImage(1)}>
              <ArrowR />
            </button>
          </div>
          <div>
            {
              this.images.map((_, index) => <button className={"Home-Image-Button " + (this.state.currentImage === index ? "Home-Image-Button-Active" : "")} key={index} onClick={() => this.setImageIndex(index)} />)
            }
          </div>
        </div>
        <div className="Info-Row" style={{ backgroundColor: "rgb(140, 210, 255)" }}>
          <div className="Home-Nav-Splitter">
            <div className="Home-Nav-Box">
              <div className="App-Header">Need A Car?</div><br />
              <img className="Home-Icon" src="listings.png" alt="listings"></img><br />
              <button className="Home-Nav-Button" onClick={this.handleOnClick("Listings")}>
                <div className="App-Secondary">Check our our selection!</div>
              </button>
            </div>
            <div className="Home-Nav-Box">
              <div className="App-Header">Got Questions?</div><br />
              <img className="Home-Icon" src="contact.png" alt="contact"></img><br />
              <button className="Home-Nav-Button" onClick={this.handleOnClick("Support")}>
                <div className="App-Secondary">Contact our support!</div>
              </button>
            </div>
          </div>
        </div>
        <div className="Info-Row" style={{ backgroundColor: "rgb(255, 220, 220)" }}>
          <div className="Home-About-Holder">
            <div className="App-Header">About Us</div>
            <br />
            <div className="Home-About-Text">
              Emerald Auto Exchange was created to give customers used cars for the price they are worth.
              Since we started the company, we have always strived to keep prices fair for our many cars of various conditions.
              Our wide selection of used cars will ensure that you can find the right car for the right price.
            </div>
          </div>
          <br />
          <div className="Home-Flex-Row">
            <div className="Home-Column">
              <div className="App-Secondary">Affordable</div>
              <img className="Home-Icon" src="affordable.png" alt="affordable"></img>
              <div className="Home-About-Text">
                We offer cars that are affordable, ensuring that everyone can buy the right car.
              </div>
            </div>
            <div className="Home-Column">
              <div className="App-Secondary">Quality</div>
              <img className="Home-Icon" src="quality.png" alt="quality"></img>
              <div className="Home-About-Text">
                Our selection includes the highest quality used cars in the market.
              </div>
            </div>
            <div className="Home-Column">
              <div className="App-Secondary">Easy</div>
              <img className="Home-Icon" src="easy.png" alt="easy"></img>
              <div className="Home-About-Text">
                We have the easiest way to search for used cars with simple filtering options.
              </div>
            </div>
          </div>
          <br />
        </div>
        {/*
        <div className="Info-Row" style={{ backgroundColor: "rgb(192, 248, 215)" }}>
          <br />
          <div className="App-Header">The Founders</div>
          <br /><br />
          <div className="Home-Flex-Row">
            <div className="Home-Column">
              <div className="App-Secondary">Sahasrad Chippa</div>
              <br />
              <img src="" alt="John Doe" className="Home-Founder-Image"></img>
              <br />
              <div className="Home-About-Text">
                John Doe is an interesting individual who loves cars.
                He always wanted to become a car dealer when he grew up.
              </div>
            </div>
            <div className="Home-Column">
              <div className="App-Secondary">Adam Zhu</div>
              <br />
              <img src="" alt="John Doe" className="Home-Founder-Image"></img>
              <br />
              <div className="Home-About-Text">
                John Doe is an interesting individual who loves cars.
                He always wanted to become a car dealer when he grew up.
              </div>
            </div>
            <div className="Home-Column">
              <div className="App-Secondary">Ellison Zhu</div>
              <br />
              <img src="" alt="John Doe" className="Home-Founder-Image"></img>
              <br />
              <div className="Home-About-Text">
                John Doe is an interesting individual who loves cars.
                He always wanted to become a car dealer when he grew up.
              </div>
            </div>
            <div className="Home-Column">
              <div className="App-Secondary">Aarush Singh</div>
              <br />
              <img src="" alt="John Doe" className="Home-Founder-Image"></img>
              <br />
              <div className="Home-About-Text">
                John Doe is an interesting individual who loves cars.
                He always wanted to become a car dealer when he grew up.
              </div>
            </div>
          </div>
          <br />
        </div>
        */}
      </div>
    );
  }
}

export default Home;
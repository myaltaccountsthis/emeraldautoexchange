import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div className="Page">
                <div className="App-Header-Row">
                    <div className="App-Header">Welcome to Emerald Auto Exchange</div><br />
                    <div style={{ fontSize: "24px" }}>Finer Cars for Finer People</div>
                </div>
                <br />
                <div className="Info-Row" style={{ backgroundColor: "rgb(192, 248, 215)" }}>
                    <div className="Home-Image-Row">
                        <button className="Home-Image-Arrow">
                            <img src="arrowL.png" alt="Left"></img>
                        </button>
                        <img src="emerald.png" alt="Car"></img>
                        <button className="Home-Image-Arrow">
                            <img src="arrowR.png" alt="Right"></img>
                        </button>
                    </div>
                    <div>
                        <button className="Home-Image-Button"></button>
                        <button className="Home-Image-Button"></button>
                        <button className="Home-Image-Button"></button>
                    </div>
                </div>
                <div className="Info-Row">
                    <div style={{ fontSize: 40, padding: "20px" }}>About Us</div>
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
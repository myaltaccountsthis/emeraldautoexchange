import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div className="Page">
                <div className="App-Header-Row">
                    <div className="App-Header" style={{ height: "60px" }}>Welcome to Emerald Auto Exchange</div>
                    <div style={{ fontSize: "24px" }}>Finer Cars for Finer People</div>
                </div>
                <br />
                <div className="Info-Row" style={{ backgroundColor: "rgb(192, 248, 215)", padding: "50px 0px 0px 0px" }}>
                    <div className="Home-Image-Row">
                        <button>
                            <img src="arrowL" alt="Left"></img>
                        </button>
                        <img src="emerald.png" alt="Car" style={{ objectFit: "contain", height: "300px", margin: "50px 0px" }}></img>
                        <button>
                            <img src="arrowR" alt="Right"></img>
                        </button>
                    </div>
                    <div>
                        <button className="Home-Image-Button"></button>
                        <button className="Home-Image-Button"></button>
                        <button className="Home-Image-Button"></button>
                    </div>
                </div>
                <div style={{ fontSize: 40, height: "60px", padding: "20px" }}>About Us</div>
                <div className="Info-Row">

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
import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div className="Page">
                <div className="App-Header">Welcome to Emerald Auto Exchange</div>
                <br />
                <div className="Info-Row" style={{ backgroundColor: "rgb(192, 248, 215)", padding: "50px 0px 0px 0px" }}>
                    <div style={{ height: "400px", padding: "0px 200px" }}>
                        <img src="emerald.png" alt="Car" style={{ objectFit: "contain", height: "300px", margin: "50px 0px" }}></img>
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
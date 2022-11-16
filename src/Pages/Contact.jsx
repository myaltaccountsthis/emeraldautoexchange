import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="Page">
        <div className="App-Header">Contact Us</div><br />
        <div className="Contact-Form-Container">
          <form className="Contact-Form">
            <div className="Contact-Form-Row">
              <div className="Contact-Form-Row-Element">
                <label for="fname" className="Contact-Form-Element">First Name</label><br />
                <input type="text" name="fname" className="Contact-Form-Element"></input><br />
              </div>
              <div className="Contact-Form-Row-Element">
                <label for="lname" className="Contact-Form-Element">Last Name</label><br />
                <input type="text" name="lname" className="Contact-Form-Element"></input><br />
              </div>
            </div><br />
            <div className="Contact-Form-Row">
              <div className="Contact-Form-Row-Element">
                <label for="email" className="Contact-Form-Element">Email</label><br />
                <input type="text" name="email" className="Contact-Form-Element"></input><br />
              </div>
              <div className="Contact-Form-Row-Element">
                <label for="phone" className="Contact-Form-Element">Phone</label><br />
                <input type="text" name="phone" className="Contact-Form-Element"></input><br />
              </div>
            </div><br /><br />
            <button type="submit" style={{ width: "80%", margin: "auto" }}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
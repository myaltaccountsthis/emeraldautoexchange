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
                <input type="text" name="fname" className="Contact-Form-Element" placeholder="John" minLength="4" maxLength="20" required></input><br />
              </div>
              <div className="Contact-Form-Row-Element">
                <label for="lname" className="Contact-Form-Element">Last Name</label><br />
                <input type="text" name="lname" className="Contact-Form-Element" placeholder="Doe" maxLength="20" required></input><br />
              </div>
            </div><br />
            <div className="Contact-Form-Row">
              <div className="Contact-Form-Row-Element">
                <label for="email" className="Contact-Form-Element">Email</label><br />
                <input type="email" name="email" className="Contact-Form-Element" placeholder="johndoe@gmail.com" required></input><br />
              </div>
              <div className="Contact-Form-Row-Element">
                <label for="phone" className="Contact-Form-Element">Phone</label><br />
                <input type="tel" name="phone" className="Contact-Form-Element" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required></input><br />
              </div>
            </div><br />
            <div className="Contact-Form-Row-Element">
              <label for="reason" className="Contact-Form-Element">Reason</label><br />
              <textarea type="text" name="reason" className="Contact-Form-Element" maxLength="1000" placeholder="Please provide a reason" style={{ minWidth: "100%", maxWidth: "100%", minHeight: "3em", fontFamily: "inherit", fontSize: ".8em", resize: "vertical" }} required></textarea><br />
            </div><br />
            <br />
            <button type="submit" className="Rounded" style={{ width: "80%", margin: "auto" }} onSubmit="alert">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
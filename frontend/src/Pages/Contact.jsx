import React from "react";

class Contact extends React.Component {
  onSubmit() {

  }

  forceDashes(event) {
    const target = event.target;
    let str = target.value;
    str = str.replace(/[^\d-]/g, '');
    const len = str.length;
    str = str.replace(/[\D]/g, '');
    const nums = str.length;
    const tokens = [str.slice(0, 3).padEnd(3), str.slice(3, 6).padEnd(3), str.slice(6, 10)];
    target.value = nums === 0 ? "" : tokens.join("-");
    target.selectionEnd = len < 2 ? len : len - (2 - Math.floor(nums / 3));
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header">Contact Us</div><br />
        <div className="Contact-Form-Container">
          <form className="Contact-Form">
            <div className="Contact-Form-Row">
              <div className="Contact-Form-Row-Element">
                <label htmlFor="fname" className="Contact-Form-Element">First Name</label><br />
                <input type="text" name="fname" className="Contact-Form-Element" placeholder="John" minLength="4" maxLength="20" required></input><br />
              </div>
              <div className="Contact-Form-Row-Element">
                <label htmlFor="lname" className="Contact-Form-Element">Last Name</label><br />
                <input type="text" name="lname" className="Contact-Form-Element" placeholder="Doe" maxLength="20" required></input><br />
              </div>
            </div><br />
            <div className="Contact-Form-Row">
              <div className="Contact-Form-Row-Element">
                <label htmlFor="email" className="Contact-Form-Element">Email</label><br />
                <input type="email" name="email" className="Contact-Form-Element" placeholder="johndoe@gmail.com" required></input><br />
              </div>
              <div className="Contact-Form-Row-Element">
                <label htmlFor="phone" className="Contact-Form-Element">Phone</label><br />
                <input type="tel" name="phone" className="Contact-Form-Element" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" maxLength="12" onChange={this.forceDashes} required></input><br />
              </div>
            </div><br />
            <div className="Contact-Form-Row-Element">
              <label htmlFor="reason" className="Contact-Form-Element">Reason</label><br />
              <textarea type="text" name="reason" className="Contact-Form-Element" maxLength="1000" placeholder="Please provide a reason" required></textarea><br />
            </div><br />
            <br />
            <button type="submit" className="Rounded" style={{ width: "80%", margin: "auto" }} onSubmit={this.onSubmit}>Submit</button>
          </form>
          <br />
        </div>
      </div>
    );
  }
}

export default Contact;
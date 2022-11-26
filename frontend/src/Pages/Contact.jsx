import React from 'react';
import './Contact.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.reasons = [ "I want to buy a car", "I want to sell my car", "Other (tell us in other comments)" ];
  }

  onSubmit() {

    return false;
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

  resizeTextArea(event) {
    const target = event.target;
    target.style.height = "auto";
    target.style.height = (target.scrollHeight + 6) + "px";
  }

  render() {
    return (
      <div className="Page">
        <div className="App-Header">Need Help?</div><br />
        <div>Contact Us</div>
        <div className="Contact-Form-Container">
          <form className="Contact-Form" onSubmit={this.ons}>
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
                <input type="tel" name="phone" className="Contact-Form-Element" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" maxLength="12" onInput={this.forceDashes} required></input><br />
              </div>
            </div><br />
            <div className="Contact-Form-Row">
              <div className="Contact-Form-Row-Element">
                <label htmlFor="reason" className="Contact-Form-Element">Reason</label><br />
                <select name="reason" className="Contact-Form-Element" required>
                  {
                    this.reasons.map(reason => <option key={reason} value={reason}>{reason}</option>)
                  }
                </select>
              </div>
            </div><br />
            <div className="Contact-Form-Row-Element">
              <label htmlFor="comments" className="Contact-Form-Element">Other comments</label><br />
              <textarea type="text" name="comments" className="Contact-Form-Element" maxLength="1000" placeholder="Anything you want us to know?" onInput={this.resizeTextArea}></textarea><br />
            </div><br />
            <br />
            <button type="submit" className="Contact-Submit" style={{ width: "80%", margin: "auto" }}>Submit</button>
          </form>
          <br />
        </div>
      </div>
    );
  }
}

export default Contact;
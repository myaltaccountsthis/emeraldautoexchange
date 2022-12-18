package is.myusernamesth.eae;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "contact_forms")
public class ContactForm {

    @Id
    @GeneratedValue
    private Integer id;
    private String fname;
    private String lname;
    private String email;
    private String phone;
    private int reason;
    private String comments;

    public ContactForm(String fname, String lname, String email, String phone, String reason, String comments) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
        this.reason = ReasonTypes.getId(reason);
        this.comments = comments;
    }

    private ContactForm() {

    }

    public String getReason() {
        return ReasonTypes.getReason(reason);
    }

    public Integer getId() {
        return id;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getComments() {
        return comments;
    }
}


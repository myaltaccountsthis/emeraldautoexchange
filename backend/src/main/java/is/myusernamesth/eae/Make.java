package is.myusernamesth.eae;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "makes")
public class Make {
    @Id
    public Integer id;
    public String name;
    public String country;
}

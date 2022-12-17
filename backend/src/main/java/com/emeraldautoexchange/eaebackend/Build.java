package com.emeraldautoexchange.eaebackend;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "builds")
public class Build {
    @Id
    public Integer id;
    public String name;
}

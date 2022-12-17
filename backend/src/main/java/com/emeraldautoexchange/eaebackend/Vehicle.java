package com.emeraldautoexchange.eaebackend;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "inventory_view")
public class Vehicle {
    @Id
    public Integer id;

    public Integer year;
    public String make;
    public String model;
    public String build;

    public Integer miles;
    public Integer msrp;
    public Integer price;
}

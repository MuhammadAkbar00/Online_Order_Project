package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Custom {
    private long id;
    private String name;
    private String desc;
    private Date date;
    private String type;
    private int total;
    private Occasion occasion;
    private Collection<CustomPart> customParts;
    private Collection<Product> products;

    @Id
    @Column(name = "ID")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "DESC")
    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Basic
    @Column(name = "DATE")
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Basic
    @Column(name = "TYPE")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "TOTAL")
    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Custom custom = (Custom) o;
        return id == custom.id &&
                total == custom.total &&
                Objects.equals(name, custom.name) &&
                Objects.equals(desc, custom.desc) &&
                Objects.equals(date, custom.date) &&
                Objects.equals(type, custom.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, desc, date, type, total);
    }

    @ManyToOne
    @JoinColumn(name = "OCCASION_ID", referencedColumnName = "ID")
    public Occasion getOccasion() {
        return occasion;
    }

    public void setOccasion(Occasion occasion) {
        this.occasion = occasion;
    }

    @OneToMany(mappedBy = "custom")
    public Collection<CustomPart> getCustomParts() {
        return customParts;
    }

    public void setCustomParts(Collection<CustomPart> customParts) {
        this.customParts = customParts;
    }

//    @OneToMany(mappedBy = "custom")
//    public Collection<Product> getProducts() {
//        return products;
//    }
//    public void setProducts(Collection<Product> products) {
//        this.products = products;
//    }

}

package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Occasion {
    private long id;
    private String name;
    private int discount;
    private Date startDate;
    private Date endDate;
    private Collection<Custom> customs;
    private Collection<Normal> normals;

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
    @Column(name = "DISCOUNT")
    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    @Basic
    @Column(name = "START_DATE")
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @Basic
    @Column(name = "END_DATE")
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Occasion occasion = (Occasion) o;
        return id == occasion.id &&
                discount == occasion.discount &&
                Objects.equals(name, occasion.name) &&
                Objects.equals(startDate, occasion.startDate) &&
                Objects.equals(endDate, occasion.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, discount, startDate, endDate);
    }

    @OneToMany(mappedBy = "occasion")
    public Collection<Custom> getCustoms() {
        return customs;
    }

    public void setCustoms(Collection<Custom> customs) {
        this.customs = customs;
    }

    @OneToMany(mappedBy = "occasion")
    public Collection<Normal> getNormals() {
        return normals;
    }

    public void setNormals(Collection<Normal> normals) {
        this.normals = normals;
    }
}

package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Branch {
    private long id;
    private String name;
    private String province;
    private double lon;
    private double lat;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "PROVINCE")
    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    @Basic
    @Column(name = "LON")
    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    @Basic
    @Column(name = "LAT")
    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Branch branch = (Branch) o;
        return id == branch.id &&
                Double.compare(branch.lon, lon) == 0 &&
                Double.compare(branch.lat, lat) == 0 &&
                Objects.equals(name, branch.name) &&
                Objects.equals(province, branch.province);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, province, lon, lat);
    }
}

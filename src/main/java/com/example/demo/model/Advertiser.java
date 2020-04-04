package com.example.demo.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Advertiser {
    private long id;
    private String username;
    private String companyName;
    private Integer adAmnt;
    private Integer pricePerAd;
    private String display;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "USERNAME")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "COMPANY_NAME")
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    @Basic
    @Column(name = "AD_AMNT")
    public Integer getAdAmnt() {
        return adAmnt;
    }

    public void setAdAmnt(Integer adAmnt) {
        this.adAmnt = adAmnt;
    }

    @Basic
    @Column(name = "PRICE_PER_AD")
    public Integer getPricePerAd() {
        return pricePerAd;
    }

    public void setPricePerAd(Integer pricePerAd) {
        this.pricePerAd = pricePerAd;
    }

    @Basic
    @Column(name = "DISPLAY")
    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Advertiser that = (Advertiser) o;
        return id == that.id &&
                Objects.equals(username, that.username) &&
                Objects.equals(companyName, that.companyName) &&
                Objects.equals(adAmnt, that.adAmnt) &&
                Objects.equals(pricePerAd, that.pricePerAd) &&
                Objects.equals(display, that.display);
    }



    @Override
    public int hashCode() {
        return Objects.hash(id, username, companyName, adAmnt, pricePerAd, display);
    }

}

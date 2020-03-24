package com.example.demo.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Advertiser {
    private long id;
    private String username;
    private String companyName;
    private int adAmnt;
    private int pricePerAd;
    private String display;

    @Id
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
    public int getAdAmnt() {
        return adAmnt;
    }

    public void setAdAmnt(int adAmnt) {
        this.adAmnt = adAmnt;
    }

    @Basic
    @Column(name = "PRICE_PER_AD")
    public int getPricePerAd() {
        return pricePerAd;
    }

    public void setPricePerAd(int pricePerAd) {
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

        if (id != that.id) return false;
        if (adAmnt != that.adAmnt) return false;
        if (pricePerAd != that.pricePerAd) return false;
        if (username != null ? !username.equals(that.username) : that.username != null) return false;
        if (companyName != null ? !companyName.equals(that.companyName) : that.companyName != null) return false;
        if (display != null ? !display.equals(that.display) : that.display != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (companyName != null ? companyName.hashCode() : 0);
        result = 31 * result + adAmnt;
        result = 31 * result + pricePerAd;
        result = 31 * result + (display != null ? display.hashCode() : 0);
        return result;
    }
}

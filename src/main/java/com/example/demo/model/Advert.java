package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Advert {
    private Long id;
    private Long advertiserId;
    private String desc;
    private String image;
    private Integer slot;
    private String display;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "ADVERTISER_ID")
    public long getAdvertiserId() {
        return advertiserId;
    }

    public void setAdvertiserId(Long advertiserId) {
        this.advertiserId = advertiserId;
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
    @Column(name = "IMAGE")
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Basic
    @Column(name = "SLOT")
    public Integer getSlot() {
        return slot;
    }

    public void setSlot(Integer slot) {
        this.slot = slot;
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

        Advert advert = (Advert) o;

        if (id != advert.id) return false;
        if (advertiserId != advert.advertiserId) return false;
        if (desc != null ? !desc.equals(advert.desc) : advert.desc != null) return false;
        if (image != null ? !image.equals(advert.image) : advert.image != null) return false;
        if (slot != null ? !slot.equals(advert.slot) : advert.slot != null) return false;
        if (display != null ? !display.equals(advert.display) : advert.display != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (int) (advertiserId ^ (advertiserId >>> 32));
        result = 31 * result + (desc != null ? desc.hashCode() : 0);
        result = 31 * result + (image != null ? image.hashCode() : 0);
        result = 31 * result + (slot != null ? slot.hashCode() : 0);
        result = 31 * result + (display != null ? display.hashCode() : 0);
        return result;
    }
}

package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Advert {
    private long id;
    private String desc;
    private String image;
    private Integer slot;
    private String display;
    private Advertiser advertiser;

    @Id
    @Column(name = "ID")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
        return id == advert.id &&
                Objects.equals(desc, advert.desc) &&
                Objects.equals(image, advert.image) &&
                Objects.equals(slot, advert.slot) &&
                Objects.equals(display, advert.display);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, desc, image, slot, display);
    }

    @ManyToOne
    @JoinColumn(name = "ADVERTISER_ID", referencedColumnName = "ID", nullable = false)
    public Advertiser getAdvertiser() {
        return advertiser;
    }

    public void setAdvertiser(Advertiser advertiser) {
        this.advertiser = advertiser;
    }
}

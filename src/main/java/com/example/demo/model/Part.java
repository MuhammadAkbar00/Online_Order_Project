package com.example.demo.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Part {
    private long id;
    private String name;
    private String type;
    private int price;
    private String image;
    private String required;
    private Collection<CustomPart> customParts;

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
    @Column(name = "TYPE")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "PRICE")
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
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
    @Column(name = "REQUIRED")
    public String getRequired() {
        return required;
    }

    public void setRequired(String required) {
        this.required = required;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Part part = (Part) o;
        return id == part.id &&
                price == part.price &&
                Objects.equals(name, part.name) &&
                Objects.equals(type, part.type) &&
                Objects.equals(image, part.image) &&
                Objects.equals(required, part.required);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, price, image, required);
    }

    @OneToMany(mappedBy = "part")
    public Collection<CustomPart> getCustomParts() {
        return customParts;
    }

    public void setCustomParts(Collection<CustomPart> customParts) {
        this.customParts = customParts;
    }
}

package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Part {
    private long id;
    private String name;
    private String type;
    private int price;
    private String image;
    private String position;
    private String required;

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
    @Column(name = "POSITION")
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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

        if (id != part.id) return false;
        if (price != part.price) return false;
        if (name != null ? !name.equals(part.name) : part.name != null) return false;
        if (type != null ? !type.equals(part.type) : part.type != null) return false;
        if (image != null ? !image.equals(part.image) : part.image != null) return false;
        if (position != null ? !position.equals(part.position) : part.position != null) return false;
        if (required != null ? !required.equals(part.required) : part.required != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + price;
        result = 31 * result + (image != null ? image.hashCode() : 0);
        result = 31 * result + (position != null ? position.hashCode() : 0);
        result = 31 * result + (required != null ? required.hashCode() : 0);
        return result;
    }
}

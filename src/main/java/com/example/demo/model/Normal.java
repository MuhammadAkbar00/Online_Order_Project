package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Normal {
    private long id;
    private String name;
    private String desc;
    private String image;
    private String type;
    private int price;
    private String stock;
    private int quantity;
    private long occasionId;

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
    @Column(name = "STOCK")
    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    @Basic
    @Column(name = "QUANTITY")
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Basic
    @Column(name = "OCCASION_ID")
    public long getOccasionId() {
        return occasionId;
    }

    public void setOccasionId(long occasionId) {
        this.occasionId = occasionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Normal normal = (Normal) o;

        if (id != normal.id) return false;
        if (price != normal.price) return false;
        if (quantity != normal.quantity) return false;
        if (occasionId != normal.occasionId) return false;
        if (name != null ? !name.equals(normal.name) : normal.name != null) return false;
        if (desc != null ? !desc.equals(normal.desc) : normal.desc != null) return false;
        if (image != null ? !image.equals(normal.image) : normal.image != null) return false;
        if (type != null ? !type.equals(normal.type) : normal.type != null) return false;
        if (stock != null ? !stock.equals(normal.stock) : normal.stock != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (desc != null ? desc.hashCode() : 0);
        result = 31 * result + (image != null ? image.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + price;
        result = 31 * result + (stock != null ? stock.hashCode() : 0);
        result = 31 * result + quantity;
        result = 31 * result + (int) (occasionId ^ (occasionId >>> 32));
        return result;
    }
}

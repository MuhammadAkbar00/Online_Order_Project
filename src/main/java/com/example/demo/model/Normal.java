package com.example.demo.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Normal {
    private long id;
    private String name;
    private String desc;
    private String image;
    private String type;
    private Integer price;
    private String stock;
    private Integer quantity;
    private Occasion occasion;

    @Override
    public String toString() {
        return "Normal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", image='" + image + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", stock='" + stock + '\'' +
                ", quantity=" + quantity +
                ", occasion=" + occasion +
                '}';
    }

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
    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
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
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Normal normal = (Normal) o;
        return id == normal.id &&
                price == normal.price &&
                quantity == normal.quantity &&
                Objects.equals(name, normal.name) &&
                Objects.equals(desc, normal.desc) &&
                Objects.equals(image, normal.image) &&
                Objects.equals(type, normal.type) &&
                Objects.equals(stock, normal.stock);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, desc, image, type, price, stock, quantity);
    }

    @ManyToOne
    @JoinColumn(name = "OCCASION_ID", referencedColumnName = "ID")
    public Occasion getOccasion() {
        return occasion;
    }

    public void setOccasion(Occasion occasion) {
        this.occasion = occasion;
    }

}

package com.example.demo.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Product {
    private long id;
    private Collection<Analytics> analytics;
    private Collection<OrderItem> orderItems;
    private Custom custom;
    private Normal normal;

    @Id
    @Column(name = "ID")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id == product.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @OneToMany(mappedBy = "product")
    public Collection<Analytics> getAnalytics() {
        return analytics;
    }

    public void setAnalytics(Collection<Analytics> analytics) {
        this.analytics = analytics;
    }

    @OneToMany(mappedBy = "product")
    public Collection<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Collection<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    @ManyToOne
    @JoinColumn(name = "CUSTOM_ID", referencedColumnName = "ID")
    public Custom getCustom() {
        return custom;
    }

    public void setCustom(Custom custom) {
        this.custom = custom;
    }

    @ManyToOne
    @JoinColumn(name = "NORMAL_ID", referencedColumnName = "ID")
    public Normal getNormal() {
        return normal;
    }

    public void setNormal(Normal normal) {
        this.normal = normal;
    }
}

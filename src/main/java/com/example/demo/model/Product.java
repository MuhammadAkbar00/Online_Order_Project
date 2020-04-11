package com.example.demo.model;

import javax.persistence.*;
import javax.validation.constraints.Null;
import org.springframework.lang.Nullable;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Product {
    private Long id;
    private Long customId;
    private Long normalId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    @Nullable
    @Column(name = "CUSTOM_ID")
    public Long getCustomId() {
        return customId;
    }

    public void setCustomId(Long custom) {
        this.customId = custom;
    }

    @Nullable
    @Column(name = "NORMAL_ID")
    public Long getNormalId() {
        return normalId;
    }

    public void setNormalId(Long normal) {
        this.normalId = normal;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", custom=" + customId +
                ", normal=" + normalId +
                '}';
    }
}

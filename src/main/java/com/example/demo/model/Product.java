package com.example.demo.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Product {
    private long id;
    private long customId;
    private long normalId;

    @Id
    @Column(name = "ID")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "CUSTOM_ID")
    public long getCustomId() {
        return customId;
    }

    public void setCustomId(Long customId) {
        this.customId = customId;
    }

    public void setCustomId(long customId) {
        this.customId = customId;
    }

    @Basic
    @Column(name = "NORMAL_ID")
    public long getNormalId() {
        return normalId;
    }

    public void setNormalId(Long normalId) {
        this.normalId = normalId;
    }

    public void setNormalId(long normalId) {
        this.normalId = normalId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        if (id != product.id) return false;
        if (customId != product.customId) return false;
        if (normalId != product.normalId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (int) (customId ^ (customId >>> 32));
        result = 31 * result + (int) (normalId ^ (normalId >>> 32));
        return result;
    }
}

package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Product {
    private long id;
    private long customId;
    private long normalId;
    private Custom customByCustomId;
    private Normal normalByNormalId;

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
    @Column(name = "CUSTOM_ID")
    public long getCustomId() {
        return customId;
    }

    public void setCustomId(long customId) {
        this.customId = customId;
    }

    @Basic
    @Column(name = "NORMAL_ID")
    public long getNormalId() {
        return normalId;
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

    @ManyToOne
    @JoinColumn(name = "CUSTOM_ID", referencedColumnName = "ID")
    public Custom getCustomByCustomId() {
        return customByCustomId;
    }

    public void setCustomByCustomId(Custom customByCustomId) {
        this.customByCustomId = customByCustomId;
    }

    @ManyToOne
    @JoinColumn(name = "NORMAL_ID", referencedColumnName = "ID")
    public Normal getNormalByNormalId() {
        return normalByNormalId;
    }

    public void setNormalByNormalId(Normal normalByNormalId) {
        this.normalByNormalId = normalByNormalId;
    }
}

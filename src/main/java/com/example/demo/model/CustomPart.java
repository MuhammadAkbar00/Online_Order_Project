package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "CUSTOM_PART", schema = "PUBLIC", catalog = "PUBLIC")
public class CustomPart {
    private long id;
    private long partId;
    private long customId;

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
    @Column(name = "PART_ID")
    public long getPartId() {
        return partId;
    }

    public void setPartId(long partId) {
        this.partId = partId;
    }

    @Basic
    @Column(name = "CUSTOM_ID")
    public long getCustomId() {
        return customId;
    }

    public void setCustomId(long customId) {
        this.customId = customId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CustomPart that = (CustomPart) o;

        if (id != that.id) return false;
        if (partId != that.partId) return false;
        if (customId != that.customId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (int) (partId ^ (partId >>> 32));
        result = 31 * result + (int) (customId ^ (customId >>> 32));
        return result;
    }
}

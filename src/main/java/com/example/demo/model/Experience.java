package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Experience {
    private long id;
    private Integer stars;
    private Long orderId;

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
    @Column(name = "ORDER_ID")
    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Basic
    @Column(name = "STARS")
    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Experience that = (Experience) o;
        return id == that.id &&
                stars == that.stars;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, stars);
    }
}

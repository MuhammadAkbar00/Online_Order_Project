package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Coupon {
    private long id;
    private long userId;
    private int discount;
    private String code;
    private Date expire;
    private String desc;

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
    @Column(name = "USER_ID")
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "DISCOUNT")
    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    @Basic
    @Column(name = "CODE")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Basic
    @Column(name = "EXPIRE")
    public Date getExpire() {
        return expire;
    }

    public void setExpire(Date expire) {
        this.expire = expire;
    }

    @Basic
    @Column(name = "DESC")
    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Coupon coupon = (Coupon) o;

        if (id != coupon.id) return false;
        if (userId != coupon.userId) return false;
        if (discount != coupon.discount) return false;
        if (code != null ? !code.equals(coupon.code) : coupon.code != null) return false;
        if (expire != null ? !expire.equals(coupon.expire) : coupon.expire != null) return false;
        if (desc != null ? !desc.equals(coupon.desc) : coupon.desc != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (int) (userId ^ (userId >>> 32));
        result = 31 * result + discount;
        result = 31 * result + (code != null ? code.hashCode() : 0);
        result = 31 * result + (expire != null ? expire.hashCode() : 0);
        result = 31 * result + (desc != null ? desc.hashCode() : 0);
        return result;
    }
}

package com.example.demo.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class Analytics {
    private long id;
    private String page;
    private long productId;
    private Date date;
    private int time;
    private String username;

    @Id
    @Column(name = "ID")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "PAGE")
    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    @Basic
    @Column(name = "PRODUCT_ID")
    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    @Basic
    @Column(name = "DATE")
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Basic
    @Column(name = "TIME")
    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    @Basic
    @Column(name = "USERNAME")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Analytics analytics = (Analytics) o;

        if (id != analytics.id) return false;
        if (productId != analytics.productId) return false;
        if (time != analytics.time) return false;
        if (page != null ? !page.equals(analytics.page) : analytics.page != null) return false;
        if (date != null ? !date.equals(analytics.date) : analytics.date != null) return false;
        if (username != null ? !username.equals(analytics.username) : analytics.username != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (page != null ? page.hashCode() : 0);
        result = 31 * result + (int) (productId ^ (productId >>> 32));
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + time;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        return result;
    }
}

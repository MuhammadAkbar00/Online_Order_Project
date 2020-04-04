package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Analytic {
    private long id;
    private String pagename;
    private Long productId;
    private Date date;
    private Integer time;
    private String username;

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
    @Column(name = "PAGENAME")
    public String getPagename() {
        return pagename;
    }

    public void setPagename(String pagename) {
        this.pagename = pagename;
    }

    @Basic
    @Column(name = "PRODUCT_ID")
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long product) {
        this.productId = product;
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
    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
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

        Analytic analytic = (Analytic) o;

        if (id != analytic.id) return false;
        if (productId != analytic.productId) return false;
        if (time != analytic.time) return false;
        if (pagename != null ? !pagename.equals(analytic.pagename) : analytic.pagename != null) return false;
        if (date != null ? !date.equals(analytic.date) : analytic.date != null) return false;
        if (username != null ? !username.equals(analytic.username) : analytic.username != null) return false;

        return true;
    }


    @Override
    public String toString() {
        return "Analytic{" +
                "id=" + id +
                ", pagename='" + pagename + '\'' +
                ", productId=" + productId +
                ", date=" + date +
                ", time=" + time +
                ", username='" + username + '\'' +
                '}';
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (pagename != null ? pagename.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + time;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        return result;
    }
}

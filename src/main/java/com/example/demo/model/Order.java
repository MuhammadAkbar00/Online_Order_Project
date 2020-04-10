package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Order {
    private Long id;
    private Long userId;
    private Long branchId;
    private Date date;
    private int total;
    private String paymentMethod;
    private String paid;
    private Date lastAccess;
    private String dinein;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "USER_ID")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "BRANCH_ID")
    public Long getBranchId() {
        return branchId;
    }

    public void setBranchId(Long branchId) {
        this.branchId = branchId;
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
    @Column(name = "TOTAL")
    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    @Basic
    @Column(name = "PAYMENT_METHOD")
    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    @Basic
    @Column(name = "PAID")
    public String getPaid() {
        return paid;
    }

    public void setPaid(String paid) {
        this.paid = paid;
    }

    @Basic
    @Column(name = "LAST_ACCESS")
    public Date getLastAccess() {
        return lastAccess;
    }

    public void setLastAccess(Date lastAccess) {
        this.lastAccess = lastAccess;
    }

    @Basic
    @Column(name = "DINEIN")
    public String getDinein() {
        return dinein;
    }

    public void setDinein(String dinein) {
        this.dinein = dinein;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Order order = (Order) o;

        if (id != order.id) return false;
        if (userId != order.userId) return false;
        if (total != order.total) return false;
        if (branchId != null ? !branchId.equals(order.branchId) : order.branchId != null) return false;
        if (date != null ? !date.equals(order.date) : order.date != null) return false;
        if (paymentMethod != null ? !paymentMethod.equals(order.paymentMethod) : order.paymentMethod != null)
            return false;
        if (paid != null ? !paid.equals(order.paid) : order.paid != null) return false;
        if (lastAccess != null ? !lastAccess.equals(order.lastAccess) : order.lastAccess != null) return false;
        if (dinein != null ? !dinein.equals(order.dinein) : order.dinein != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (int) (userId ^ (userId >>> 32));
        result = 31 * result + (branchId != null ? branchId.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + total;
        result = 31 * result + (paymentMethod != null ? paymentMethod.hashCode() : 0);
        result = 31 * result + (paid != null ? paid.hashCode() : 0);
        result = 31 * result + (lastAccess != null ? lastAccess.hashCode() : 0);
        result = 31 * result + (dinein != null ? dinein.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", userId=" + userId +
                ", branchId=" + branchId +
                ", date=" + date +
                ", total=" + total +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", paid='" + paid + '\'' +
                ", lastAccess=" + lastAccess +
                ", dinein='" + dinein + '\'' +
                '}';
    }
}

package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Order {
    private long id;
    private Date date;
    private int total;
    private String paymentMethod;
    private String paid;
    private Date lastAccess;
    private String dinein;
    private Collection<Experience> experiences;
    private User user;
    private Branch branch;
    private Collection<OrderItem> orderItems;

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
        return id == order.id &&
                total == order.total &&
                Objects.equals(date, order.date) &&
                Objects.equals(paymentMethod, order.paymentMethod) &&
                Objects.equals(paid, order.paid) &&
                Objects.equals(lastAccess, order.lastAccess) &&
                Objects.equals(dinein, order.dinein);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, total, paymentMethod, paid, lastAccess, dinein);
    }

    @OneToMany(mappedBy = "order")
    public Collection<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(Collection<Experience> experiences) {
        this.experiences = experiences;
    }

    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "ID", nullable = false)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "BRANCH_ID", referencedColumnName = "ID", nullable = false)
    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    @OneToMany(mappedBy = "order")
    public Collection<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Collection<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}

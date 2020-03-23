package com.example.demo.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;
import com.example.demo.jwt.JwtUser;

@Entity
public class User {
    private long id;
    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String mailing;
    private int points;
    private String language;
    private int phone;

    @Id
    @Column(name = "ID")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "USERNAME")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "FIRST_NAME")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "LAST_NAME")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "ADDRESS")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "EMAIL")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "MAILING")
    public String getMailing() {
        return mailing;
    }

    public void setMailing(String mailing) {
        this.mailing = mailing;
    }

    @Basic
    @Column(name = "POINTS")
    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Basic
    @Column(name = "LANGUAGE")
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @Basic
    @Column(name = "PHONE")
    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id &&
                points == user.points &&
                Objects.equals(username, user.username) &&
                Objects.equals(firstName, user.firstName) &&
                Objects.equals(lastName, user.lastName) &&
                Objects.equals(address, user.address) &&
                Objects.equals(email, user.email) &&
                Objects.equals(mailing, user.mailing) &&
                Objects.equals(language, user.language) &&
                Objects.equals(phone, user.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, firstName, lastName, address, email, mailing, points, language);
    }
}

package com.example.demo.jwt;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "JWT_USER", schema = "PUBLIC", catalog = "PUBLIC")
public class JwtUser {
    private long id;
    private String username;
    private String password;
    private String role;

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
    @Column(name = "PASSWORD")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "ROLE")
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JwtUser jwtUser = (JwtUser) o;
        return id == jwtUser.id &&
                Objects.equals(username, jwtUser.username) &&
                Objects.equals(password, jwtUser.password) &&
                Objects.equals(role, jwtUser.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, role);
    }
}

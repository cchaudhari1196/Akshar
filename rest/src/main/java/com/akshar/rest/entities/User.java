package com.akshar.rest.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.mapping.Set;

@Entity
@Table
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String email;

    @Column
    private Date time;

    /*This is unidirectional Approch.*/
    /*Cascade all denotes, Cascassing among  sub table and master table*/
    /*One-current class _____TO ___________Many- Sub class i.e. Address here */
    /*Join column : name- column name from DB that is used to to join these 2 tables i.e. User and Address.
    *               : refernceColumnName- Column from current table(User) which is involved in this relationship.*/
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private List<Address> address;

    /*This is Bidirectional Approch: i.e. In User, will have filed named roles. And in Role, we will have field named User */
    /*mappedBy - Tell hibernate which table ownes the relationship    */
    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Role> roles = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public List<Address> getAddress() {
        return address;
    }

    public void setAddress(List<Address> address) {
        this.address = address;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public void addRoles(Role role) {
        this.roles.add(role);
    }
}

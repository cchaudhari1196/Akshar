package com.akshar.rest.entities;


import javax.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY  )
    private Long id;

    @Column(name = "address_line_1")
    private String line1;

    @Column(name = "address_line_2")
    private String line2;

    @Column
    private String city;

    @Column
    private Long pincode;

    @Column
    private String country;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getPincode() {
        return pincode;
    }

    public void setPincode(Long pincode) {
        this.pincode = pincode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}

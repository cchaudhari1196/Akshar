package com.akshar.rest.model;

import com.akshar.rest.entities.Address;
import com.akshar.rest.entities.Role;
import com.akshar.rest.entities.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.*;

public class UserModel {

    private Long id;
    private String username;
    private String email;
    private Date time;
    private String password;
    private Boolean status;
    private List<AddressModel> address;

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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<AddressModel> getAddress() {
        return address;
    }

    public void setAddress(List<AddressModel> address) {
        this.address = address;
    }

    public User createModel(){
        User user = new User();
        user.setUsername(this.username);
        user.setTime(this.getTime());
        user.setEmail(this.email);
        user.setPassword(new BCryptPasswordEncoder().encode(this.password));

        List<Address> addresses = new ArrayList<>();
        for(AddressModel am : this.address){
            Address a = new Address();
            a.setLine1(am.getLine1());
            a.setLine2(am.getLine2());
            a.setCity(am.getCity());
            a.setCountry(am.getCountry());
            a.setPincode(am.getPincode());
            addresses.add(a);
        }
        user.setAddress(addresses);

        Role userRole = new Role();
        userRole.setName("USER");
        userRole.setUser(user);
        user.addRoles(userRole);
        return user;
    }

    public static UserModel createModel(User user){
        UserModel model = new UserModel();
        model.setUsername(user.getUsername());
        model.setTime(user.getTime());
        model.setEmail(user.getEmail());
        model.setPassword(user.getPassword());

        List<AddressModel> addresses = new ArrayList<>();
        for(Address a : user.getAddress()){
            AddressModel am = new AddressModel();
            am.setLine1(a.getLine1());
            am.setLine2(a.getLine2());
            am.setCity(a.getCity());
            am.setCountry(a.getCountry());
            am.setPincode(a.getPincode());
            addresses.add(am);
        }
        model.setAddress(addresses);

        return model;
    }
}

package com.dubzoom.dubzoom.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
    private Integer id;
    private String fname;
    private String lname;
    private String email;
    private String password;

    public User() {}

    public User(@JsonProperty("fname") String fname, @JsonProperty("lname") String lname,
                @JsonProperty("email") String email, @JsonProperty("password") String password) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
    }

    public User(User u) {
        this.id = u.getId();
        this.fname = u.getFname();
        this.lname = u.getLname();
        this.email = u.getEmail();
        this.password = u.getPassword();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserID(int id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }
}

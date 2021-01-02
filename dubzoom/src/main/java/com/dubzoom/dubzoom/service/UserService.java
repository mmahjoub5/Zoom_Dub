package com.dubzoom.dubzoom.service;

import com.dubzoom.dubzoom.dao.UserDAO;
import com.dubzoom.dubzoom.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(@Qualifier("ImplementedUserDAO") UserDAO udao)
    {
        userDAO = udao;
    }

    public User signupUser(User user) {
        return userDAO.signupUser(user);
    }

    public User loginUser(User user) {
        return userDAO.loginUser(user);
    }
}

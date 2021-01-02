package com.dubzoom.dubzoom.dao;

import com.dubzoom.dubzoom.model.User;

public interface UserDAO {

    User signupUser(User user);

    User loginUser(User user);
}

package com.dubzoom.dubzoom.dao;

import com.dubzoom.dubzoom.model.User;
import com.dubzoom.dubzoom.model.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Repository("ImplementedUserDAO")
public class ImplementedUserDAO extends JdbcDaoSupport implements UserDAO {

    private static List<User> users = new ArrayList<User>();

    private final PasswordEncoder encoder;
    @Autowired
    private JdbcTemplate jdbcTemplateObject;

    @Autowired
    public ImplementedUserDAO(DataSource ds, PasswordEncoder encoder) {
        setDataSource(ds);
        this.jdbcTemplateObject = getJdbcTemplate();
        this.selectAll();
        this.encoder = encoder;
    }

    private void selectAll() {
        this.users = jdbcTemplateObject.query("SELECT * FROM Users", new UserMapper());
    }

    @Override
    public User signupUser(User user) {
        for (User u : users) {
            if(u.getEmail().equals(user.getEmail())) return null;
        }

        Random rand = new Random(System.currentTimeMillis());
        String sql = "INSERT INTO Users (id, fname, lname, email, password) VALUES (?, ?, ?, ?, ?)";

        CharSequence cs = user.getPassword();
        String encodedCS = encoder.encode(cs);
        Object[] params = {rand.nextInt(), user.getFname(), user.getLname(), user.getEmail(), encodedCS };
        int[] types = {Types.INTEGER, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR};
        try {
            Integer result = jdbcTemplateObject.update(sql, params, types);
            if (result != 0) {
                List<User> li = jdbcTemplateObject.query("Select * from Users WHERE email = ?", new UserMapper(), new Object[]{user.getEmail()});
                if (!li.isEmpty()) {
                    users.add(li.get(0));
                    User u = new User(li.get(0));
                    u.setPassword("no password sent back");
                    return u;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (DataAccessException e) {
            System.err.println("SQL insertion error for " + user.getEmail());
        } catch (Exception e) {
            System.err.println("Cannot signup user " + user.getEmail());
        }
        return null;
    }

    @Override
    public User loginUser(User user) {
        for (User u : users) {
            if(u.getEmail().equals(user.getEmail())) {
                if(encoder.matches(user.getPassword(), u.getPassword())) {
                    System.err.println("Password is correct");
                    User us = new User(u);
//                    CharSequence cs = user.getPassword();
//                    String pw = encoder.encode(cs);
//                    System.err.println(pw + " " + u.getPassword());
//                    us.setPassword("no password sent back");
                    return us;
                }
            }
        }
        return null;
    }
}

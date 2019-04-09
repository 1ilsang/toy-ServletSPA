package dao;

import domain.User;

import java.util.List;

public interface UserDAO {
    List<User> getUserRows();
    User getUser(String uid);
    boolean deleteUser(String uid);
    boolean insertUser(User user);
    boolean updateUser(String uid, User user);
}

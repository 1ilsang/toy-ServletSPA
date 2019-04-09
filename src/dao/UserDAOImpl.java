package dao;

import domain.User;

import java.util.LinkedList;
import java.util.List;

public class UserDAOImpl implements UserDAO {
    private static UserDAOImpl userDAO = new UserDAOImpl();
    // FIXME data --> Resources (Module)
    private static LinkedList<User> data;

    public static UserDAOImpl getInstance() {
        return userDAO;
    }

    private UserDAOImpl() {
        data = new LinkedList<>();
    }

    @Override
    public List<User> getUserRows() {
        return data;
    }

    @Override
    public User getUser(String uid) {
        for (User e : data) if (e.getUid().equals(uid)) return e;
        return null;
    }

    @Override
    public boolean deleteUser(String uid) {
        for (User e : data) {
            if (uid.equals(e.getUid())) {
                data.remove(e);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean insertUser(User user) {
        if (getUser(user.getUid()) == null) {
            data.add(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateUser(String uid, User user) {
        for (User e : data) {
            if (e.getUid().equals(uid)) {
                // HACK FIXME
                // XXX is it right? --> Call by Reference ?
                e = user;
                return true;
            }
        }
        return false;
    }
}
package service;

import dao.UserDAOImpl;
import domain.User;
import exception.AlreadyExistException;
import exception.CONST_ERR_MESSAGE;
import exception.EmptyException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class UserService {
    private static UserService userService = new UserService();
    private static UserDAOImpl userDAO;
    public static UserService getInstance() {
        return userService;
    }
    private UserService() {
        userDAO = UserDAOImpl.getInstance();
    }

    public void login(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        String pw = request.getParameter("pw");
        if(userDAO.getUser(id) == null || !userDAO.getUser(id).getPw().equals(pw)) {
            response.setStatus(500);
            return;
        }
        HttpSession session = request.getSession();
        session.setAttribute("uid", id);
        Cookie cookie = new Cookie("JSESSIONID", session.getId());
        cookie.setMaxAge(60*60);
        response.addCookie(cookie);
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();

        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        session.invalidate();
        response.setStatus(200);
    }

    public void register(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        String pw = request.getParameter("pw");

        if(userDAO.getUser(id) != null) {
            response.setStatus(500);
            try {
                throw new AlreadyExistException(CONST_ERR_MESSAGE.ALREADY);
            } catch (AlreadyExistException e) {
                e.printStackTrace();
            }
            return;
        }
        User user = new User();
        user.setUid(id);
        user.setPw(pw);

        userDAO.insertUser(user);
        login(request, response);
    }

    public void remove(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        if(!userDAO.deleteUser(id)) {
            response.setStatus(500);
            try {
                throw new EmptyException(CONST_ERR_MESSAGE.EMPTY);
            } catch (EmptyException e) {
                e.printStackTrace();
            }
        }
    }
}
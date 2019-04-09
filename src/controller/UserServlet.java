package controller;

import service.FoodListService;
import service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet(urlPatterns = "/user.do")
public class UserServlet extends HttpServlet {
    private static UserService userService = UserService.getInstance();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Sysout -> Buffered Thread
        System.out.println("POST] UserServlet :::");
        String action = request.getParameter("action");

        if(action.equals("login")) {
            userService.login(request, response);
        } else if(action.equals("register")) {
            userService.register(request, response);
        } else if(action.equals("remove")) {
            userService.remove(request, response);
        }
//        System.out.println(session.getId() + ", " + session.getAttribute(id));
//        String json = new Gson().toJson(new User("1", "2"));
//        response.setContentType("application/json");
//        response.getWriter().write(json);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("GET] UserServlet :::");
        String action = request.getParameter("action");

        if(action.equals("logout")) userService.logout(request, response);
    }
}

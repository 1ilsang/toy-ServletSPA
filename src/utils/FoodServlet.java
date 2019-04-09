package utils;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.FoodListService;

/**
 * Servlet implementation class FoodServlet
 */
@WebServlet("/food.do")
public class FoodServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static FoodListService foodListService = FoodListService.getInstance();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FoodServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 System.out.println("GET] UserServlet :::");
	        String action = request.getParameter("action");
	        String kind = request.getParameter("kind");

	        if(action.equals("getAll")) {
	        	foodListService.searchAll(request, response);
	        }else if(action.equals("search")&&kind.equals("0")) {
	        	foodListService.searchbyCode(request, response);
	        }else if(action.equals("search")&&kind.equals("1")) {
	        	foodListService.searchbyName(request, response);
	        }else if(action.equals("search")&&kind.equals("2")) {
	        	foodListService.searchbyMaker(request, response);
	        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        System.out.println("POST] UserServlet :::");
        String action = request.getParameter("action");

        if(action.equals("getAll")) {
        	foodListService.searchAll(request, response);
        }
	}

}

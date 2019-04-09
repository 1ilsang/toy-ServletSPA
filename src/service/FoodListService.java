package service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.FoodDAOImpl;
import domain.Food;

public class FoodListService {
	static FoodDAOImpl foodDAO;
	static FoodListService instance=new FoodListService();
	
	private FoodListService() {
		foodDAO = FoodDAOImpl.getInstance();
	}
	
	static public FoodListService getInstance() {
		return instance; 
	}

	public void searchAll(HttpServletRequest request, HttpServletResponse response){
		List<Food> foods = foodDAO.search();
		String json = new Gson().toJson(foods);
		System.out.println(json);
		response.setContentType("application/json");

		// TODO :: exception 처리
		try {
			response.getWriter().write(json);
		} catch (IOException e) { //if json is not made 
		// if file is not made
			System.out.println("json write error");
			e.printStackTrace();
		}
	}
	
/*	static public void main(String[] args) {
		FoodDAOImpl test = FoodDAOImpl.getInstance();
		List<Food> foods = test.search();
		String json = new Gson().toJson(foods);

		System.out.println(json);
		
	}
*/	
	//TODO :: finish this func
	public boolean searchbyName(HttpServletRequest request, HttpServletResponse response){
		String name = request.getParameter("target");
		System.out.println(name);
		List<Food> foods = foodDAO.searchbyName(name);
		String json = new Gson().toJson(foods);
		System.out.println(json);
		response.setContentType("application/json");

		// TODO :: exception 처리
		try {
			response.getWriter().write(json);
		} catch (IOException e) { //if json is not made 
		// if file is not made
			System.out.println("json write error");
			e.printStackTrace();
		}
		return true;
	}
	
	//TODO :: finish this func
	public boolean searchbyCode(HttpServletRequest request, HttpServletResponse response){
		int code = Integer.parseInt(request.getParameter("target"));
		List<Food> foods = foodDAO.searchbyCode(code);
		String json = new Gson().toJson(foods);
		System.out.println(json);
		response.setContentType("application/json");

		// TODO :: exception 처리
		try {
			response.getWriter().write(json);
		} catch (IOException e) { //if json is not made 
		// if file is not made
			System.out.println("json write error");
			e.printStackTrace();
		}
		return true;	
	}

	//TODO :: finish this func
	public boolean searchbyMaker(HttpServletRequest request, HttpServletResponse response){
		String maker = request.getParameter("target");
		List<Food> foods = foodDAO.searchbyMaker(maker);
		String json = new Gson().toJson(foods);
		System.out.println(json);
		response.setContentType("application/json");

		// TODO :: exception 처리
		try {
			response.getWriter().write(json);
		} catch (IOException e) { //if json is not made 
		// if file is not made
			System.out.println("json write error");
			e.printStackTrace();
		}
		return true;
	}
}

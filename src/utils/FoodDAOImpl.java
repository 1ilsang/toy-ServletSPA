package utils;

import java.util.LinkedList;
import java.util.List;

public class FoodDAOImpl implements FoodDAO {
	
	private static List<Food> data;
	private static FoodDAOImpl instance = new FoodDAOImpl();
	
	private FoodDAOImpl() { 
		data = new LinkedList<Food>();
		loadData();
	}
	
	static public FoodDAOImpl getInstance() { return instance;}
	
	private boolean loadData() {
		FoodSaxParser a = new FoodSaxParser();
		data = a.getFoods();
		//TODO :: data exception
		return true;
	}

/*	public static void main(String[] args) {
		FoodDAOImpl test = FoodDAOImpl.getInstance();
		List<Food> foods = test.search();
		for(Food f: foods) {
			System.out.println(f.getName());
		}
	}
*/
	@Override
	public List<Food> search() {
		for(Food f: data) {
			f.setHit(f.getHit()+1);
		}
		return data;
	}

	@Override
	public List<Food> searchbyCode(int code) {
		List<Food> tmp = new LinkedList<Food>();
		for(Food f: data) {
			if(f.getCode()==code) {
				f.setHit(f.getHit()+1);
				tmp.add(f);
				break;
			}
		}
		return tmp;
	}

	@Override
	public List<Food> searchbyName(String name) {
		List<Food> tmp = new LinkedList<Food>();
		for(Food f: data) {
			if(f.getName().contains(name)) {
				f.setHit(f.getHit()+1);
				tmp.add(f);
			}
		}
		return tmp;
	}

	@Override
	public List<Food> searchbyMaker(String maker) {
		List<Food> tmp = new LinkedList<Food>();
		for(Food f: data) {
			if(f.getMaker().contains(maker)) {
				f.setHit(f.getHit()+1);
				tmp.add(f);
			}
		}
		return tmp;
	}

	@Override
	public boolean addFood(int code) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteFood(int code) {
		// TODO Auto-generated method stub
		return false;
	}

}

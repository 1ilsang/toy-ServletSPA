package utils;

import java.util.List;
import utils.Food;

public interface FoodDAO {
	List<Food> search();
	List<Food> searchbyCode(int code);
	List<Food> searchbyName(String name); 
	List<Food> searchbyMaker(String maker);
	boolean addFood(int code);
	boolean deleteFood(int code);
}

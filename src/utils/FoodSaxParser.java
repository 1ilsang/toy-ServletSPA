package utils;

import java.util.List;
import java.util.Map;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import domain.Food;


/**
 * FoodNutritionSAXHandler와 FoodSAXHandler를 이용해서 식품 정보를 load하는 SAX Parser 프로 그램  
 *
 */
public class FoodSaxParser {
	private String nutritionFilePath = "C:/git_YJ/ssafyMonthlyProject/April_Servlet/resources/xml/FoodNutritionInfo.xml";
	private String foodFilePath = "C:/git_YJ/ssafyMonthlyProject/April_Servlet/resources/xml/foodInfo.xml";
	private StringBuilder xml;
	private List<Food> foods;
 	public FoodSaxParser() {
		loadData();
	}
 	
 	/**
 	 * FoodNutritionSAXHandler와 FoodSAXHandler를 이용 파싱한 식품 정보와 식품 영양 정보를  Food에 병합한다. 
 	 */
	private void loadData() {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		try{
			SAXParser parser = factory.newSAXParser();
			FoodSAXHandler handler = new FoodSAXHandler();
			FoodNutritionSAXHandler nHandler = new FoodNutritionSAXHandler();
			parser.parse(foodFilePath,handler);
			parser.parse(nutritionFilePath,nHandler);
			Map<String, Food> foodMap = handler.getFoods();
			foods = nHandler.getList();
			Food find;
			for (Food food : foods) {
				find = foodMap.get(food.getName());
				if(find!=null) {
					food.setCode(find.getCode());
					food.setName(find.getName());
					food.setMaker(find.getMaker());
					food.setMaterial(find.getMaterial());
					food.setImage(find.getImage());
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	public List<Food> getFoods() {
		System.out.println(foods);
		return foods;
	}
	public void setFoods(List<Food> foods) {
		this.foods = foods;
	}
	
}

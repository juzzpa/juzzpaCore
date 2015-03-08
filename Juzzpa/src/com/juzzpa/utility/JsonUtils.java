/**
 * 
 */
package com.juzzpa.utility;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * @author Bharat
 *
 */
public class JsonUtils {

	private static Gson gson = new GsonBuilder().create();

	public static Object validate(String json, Class<?> pojoClass){
		Object pojo = null;
		try{
			pojo = gson.fromJson(json, pojoClass);
			if( checkForNulls(pojo)){
				return pojo;
			}else{
				pojo = null;
			}
		}catch(IllegalArgumentException e){
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return pojo;
	}

	private static boolean checkForNulls(Object object) throws IllegalArgumentException, IllegalAccessException{
		for(Field field : object.getClass().getDeclaredFields()){
			field.setAccessible(true);
			if(null == field.get(object)) {
				return false;
			}
		}
		return true;
	}

	public static Map<String, String> jsonToMap(String jsonString){
		Map<String, String> map = new HashMap<String, String>();
		Type stringStringMap = new TypeToken<Map<String, String>>(){}.getType();
		map = gson.fromJson(jsonString, stringStringMap);
		return map;
	}

	public static String extractJsonStringFromRequest(HttpServletRequest req)
			throws IOException {
		BufferedReader reader = req.getReader();
		StringBuilder jsonString = new StringBuilder();
		String line;
		while(null != (line=reader.readLine())){
			jsonString.append(line);
		}
		ObjectUtils.closeQuietly(reader);
		return jsonString.toString();
	}

}

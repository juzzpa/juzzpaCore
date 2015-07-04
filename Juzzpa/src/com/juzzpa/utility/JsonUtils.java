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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.juzzpa.annotations.Optional;

/**
 * @author Bharat
 *
 */
public class JsonUtils {

	/**
	 * 
	 */
	private static Gson gson = new GsonBuilder().create();
	private final static Log LOG = LogFactory.getLog(JsonUtils.class);

	public static Object validate(String json, Class<?> pojoClass) {
		Object pojo = null;
		try {
			pojo = gson.fromJson(json, pojoClass);
			if (checkForNulls(pojo)) {
				return pojo;
			} else {
				pojo = null;
			}
		} catch (IllegalArgumentException e) {
			LOG.error("Error in JSON validation " + e);
		} catch (IllegalAccessException e) {
			LOG.error("Error in JSON validation " + e);
		}
		return pojo;
	}

	private static boolean checkForNulls(Object object)
			throws IllegalArgumentException, IllegalAccessException {
		Field[] fields = object.getClass().getDeclaredFields();
		Optional optional = null;
		for (Field field : fields) {
			field.setAccessible(true);
			optional = field.getAnnotation(Optional.class);
			if (null == optional && null == field.get(object)) {
				return false;
			}
		}
		return true;
	}

	public static Map<String, String> jsonToMap(String jsonString) {
		Map<String, String> map = new HashMap<String, String>();
		Type stringStringMap = new TypeToken<Map<String, String>>() {
		}.getType();
		map = gson.fromJson(jsonString, stringStringMap);
		return map;
	}

	public static String extractJsonStringFromRequest(HttpServletRequest req)
			throws IOException {
		BufferedReader reader = req.getReader();
		StringBuffer jsonString = new StringBuffer();
		String line;
		while (null != (line = reader.readLine())) {
			jsonString.append(line);
		}
		ObjectUtils.closeQuietly(reader);
		return jsonString.toString();
	}

	public static String toJson(Object object) {
		return gson.toJson(object);
	}

	public static Object fromJson(String jsonString, Class<?> clazz) {
		return gson.fromJson(jsonString, clazz);
	}

}

/**
 * 
 */
package com.juzzpa.servlet;

import java.io.IOException;
import java.util.Map;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.juzzpa.pojos.Business;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;

/**
 * @author Bharat
 *
 */
@WebServlet(name="BusinessDetails", urlPatterns="/businessDetails")
public class BusinessDetailsServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final String KEY = "key";
	/**
	 * 
	 */
	private static final long serialVersionUID = 1855179389442576501L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String jsonString = JsonUtils.extractJsonStringFromRequest(req);
		Business business = (Business) JsonUtils.validate(jsonString, Business.class);
		String key = new JSONObject(jsonString).getString(KEY);
		if(null != business){
			if(Database.getJedis().exists(key)){
				Map<String, String> map = JsonUtils.jsonToMap(jsonString);
				map.remove(KEY);
				Map<String, String> dbMap = Database.getJedis().hgetAll(key);
				dbMap.putAll(map);
				dbMap.put("isCurated","false");
				Database.getJedis().hmset(key, dbMap);
			}else{
				resp.getWriter().println("User Not Registered");;
			}
		}
	}

}

/**
 * 
 */
package com.juzzpa.servlet;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpStatus;

import redis.clients.jedis.Jedis;

import com.juzzpa.constants.Keys;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;

/**
 * @author Bharat
 *
 */
@WebServlet(name = "AddServices", urlPatterns = "/addServices")
public class AddServicesServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final String DELIM = ",";
	/**
	 * 
	 */
	private static final long serialVersionUID = -5623986918428874331L;
	private static final Log LOG = LogFactory.getLog(AddServicesServlet.class);

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		try {
			String jsonString = JsonUtils.extractJsonStringFromRequest(req);
			Map<String, String> requestMap = JsonUtils.jsonToMap(jsonString);
			Jedis jedis = Database.getJedis();
			if (requestMap.containsKey(Keys.KEY)
					&& requestMap.containsKey(Keys.SERVICES)) {
				String state = jedis.hget(requestMap.get(Keys.KEY), Keys.STATE);
				if (null != state && 2 <= Integer.parseInt(state)) {
					addUpdateServices(requestMap, jedis);
				} else {
					resp.setStatus(HttpStatus.SC_FORBIDDEN);
				}
			} else {
				resp.setStatus(HttpStatus.SC_BAD_REQUEST);
			}
		} catch (Exception e) {
			LOG.error("Error while adding service in T_T " + e);
			resp.setStatus(HttpStatus.SC_GONE);
		}
	}

	@SuppressWarnings("unchecked")
	private void addUpdateServices(Map<String, String> requestMap, Jedis jedis) {
		String services = jedis.hget(requestMap.get(Keys.KEY), Keys.SERVICES);
		String newServices = requestMap.get(Keys.SERVICES);
		HashSet<String> servicesSet;
		String jsonString;
		if (null == services) {
			servicesSet = new HashSet<String>(Arrays.asList(newServices
					.split(DELIM)));
			jsonString = JsonUtils.toJson(servicesSet);
			jedis.hset(requestMap.get(Keys.KEY), Keys.SERVICES, jsonString);
		} else {
			servicesSet = (HashSet<String>) JsonUtils.fromJson(services,
					HashSet.class);
			HashSet<String> updatedServices = addNewServicesToList(servicesSet,
					newServices);
			jsonString = JsonUtils.toJson(updatedServices);
			jedis.hset(requestMap.get(Keys.KEY), Keys.SERVICES, jsonString);
		}
	}

	/**
	 * @param servicesSet
	 * @param newServices
	 */
	private HashSet<String> addNewServicesToList(HashSet<String> servicesSet,
			String newServices) {
		HashSet<String> newServicesSet = new HashSet<String>(
				Arrays.asList(newServices.split(DELIM)));
		servicesSet.addAll(newServicesSet);
		return servicesSet;

	}
}

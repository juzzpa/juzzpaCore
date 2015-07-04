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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpStatus;
import org.json.JSONObject;

import redis.clients.jedis.Jedis;

import com.juzzpa.constants.Keys;
import com.juzzpa.pojos.Business;
import com.juzzpa.sendgrid.MailSender;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;

/**
 * @author Bharat
 *
 */
@WebServlet(name = "BusinessDetailsPre", urlPatterns = "/businessDetailsPre")
public class BusinessDetailsPreServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1855179389442576501L;

	private final static Log LOG = LogFactory
			.getLog(BusinessDetailsPreServlet.class);

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		try {
			String jsonString = JsonUtils.extractJsonStringFromRequest(req);
			Business business = (Business) JsonUtils.validate(jsonString,
					Business.class);
			String key = new JSONObject(jsonString).getString(Keys.KEY);
			Jedis jedis = Database.getJedis();
			if (null != business) {
				if (jedis.exists(key)) {
					Map<String, String> map = JsonUtils.jsonToMap(jsonString);
					map.remove(Keys.KEY);
					Map<String, String> dbMap = Database.getJedis()
							.hgetAll(key);
					if (null != dbMap.get(Keys.STATE)
							&& 1 <= Integer.parseInt(dbMap.get(Keys.STATE))) {
						dbMap.putAll(map);
						jedis.hmset(key, dbMap);
						MailSender.sendMail(dbMap.get(Keys.EMAILID),
								"Your profile is created");
					} else {
						resp.setStatus(HttpStatus.SC_NOT_ACCEPTABLE);
					}
				} else {
					resp.setStatus(HttpStatus.SC_NOT_FOUND);
				}
			}
		} catch (Exception e) {
			LOG.error("Error while saving businessDetails " + e);
			resp.setStatus(HttpStatus.SC_GONE);
		}
	}

}

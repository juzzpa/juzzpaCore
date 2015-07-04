/**
 * 
 */
package com.juzzpa.servlet;

import java.io.IOException;

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

/**
 * @author Bharat
 *
 */
@WebServlet(name = "Confirm", urlPatterns = "/confirm/*")
public class RegistrationConfirmationServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final String ALREADY_REGISTERED = "ALREADY REGISTERED!";
	/**
	 * 
	 */
	private static final String EXPIRED = "EXPIRED!";
	/**
	 * 
	 */
	private static final String _1 = "1";
	/**
	 * 
	 */
	private static final String NO_STRING = "";
	/**
	 * 
	 */
	private static final String SLASH = "/";
	/**
	 * 
	 */
	private static final long serialVersionUID = 170353298412291185L;

	private static final Log LOG = LogFactory
			.getLog(RegistrationConfirmationServlet.class);

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		try {
			String key = req.getPathInfo().replace(SLASH, NO_STRING);
			Jedis jedis = Database.getJedis();
			if (-2 == jedis.ttl(key)) {
				resp.getWriter().println(EXPIRED);
			} else if (-1 == jedis.ttl(key)) {
				resp.getWriter().println(ALREADY_REGISTERED);
			} else {
				String value = jedis.get(key);
				jedis.del(key);
				jedis.set(key, value);
				jedis.hset(value, Keys.STATE, _1);
				resp.getWriter().println("SUCCESS!");
			}
		} catch (Exception e) {
			LOG.error("Error in registration confirmation T_T " + e);
			resp.setStatus(HttpStatus.SC_GONE);
		}
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

	}

}

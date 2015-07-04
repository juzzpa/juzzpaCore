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

import redis.clients.jedis.Jedis;

import com.juzzpa.constants.Keys;
import com.juzzpa.google.UrlShortener;
import com.juzzpa.pojos.Registration;
import com.juzzpa.sendgrid.MailSender;
import com.juzzpa.utility.DataUtils;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;
import com.juzzpa.utility.StringUtils;

@WebServlet(name = "Register", urlPatterns = "/register")
public class RegistrationServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final String _0 = "0";
	/**
	 * 
	 */
	private static final String SLASH = "/";
	/**
	 * 
	 */
	private static final int SEVEN_DAYS = 120;// 604800;
	private static final String OK = "OK";
	/**
	 * 
	 */
	private static final long serialVersionUID = -6509883068628261132L;

	private static final Log LOG = LogFactory.getLog(RegistrationServlet.class);

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Jedis jedis = null;
		String key = null;
		boolean isSuccess = false;
		try {
			String rootUrl = req.getRequestURL().toString();
			rootUrl = rootUrl.substring(0, rootUrl.lastIndexOf(SLASH));
			String jsonString = JsonUtils.extractJsonStringFromRequest(req);
			Registration registration = (Registration) JsonUtils.validate(
					jsonString, Registration.class);
			jedis = Database.getJedis();
			if (null != registration) {
				key = registration.getEmailId();
				if (jedis.hgetAll(key).isEmpty()) {
					byte[] salt = null;
					byte[] password = null;
					salt = DataUtils.generateSalt();
					password = DataUtils.getEncryptedPassword(
							registration.getPassword(), salt);
					Map<String, String> map = JsonUtils.jsonToMap(jsonString
							.toString());
					map.put(Keys.PASSWORD, new String(password));
					map.put(Keys.SALT, new String(salt));
					map.put(Keys.STATE, _0);
					String result = jedis.hmset(key, map);
					if (OK.equals(result)) {
						long set = 0;
						String randomString = null;
						while (0 == set) {
							randomString = StringUtils.generateRandomString(6);
							set = jedis.setnx(randomString,
									registration.getEmailId());
						}
						jedis.expire(randomString, SEVEN_DAYS);
						if (null != randomString) {
							String link = UrlShortener.createUrl(rootUrl,
									randomString);
							resp.setStatus(HttpStatus.SC_OK);
							if (MailSender.sendMail(registration, link)) {
								resp.setStatus(HttpStatus.SC_OK);
							}
						}
					}
					isSuccess = true;
				} else {
					resp.setStatus(HttpStatus.SC_BAD_REQUEST);
				}
			} else {
				resp.setStatus(HttpStatus.SC_BAD_REQUEST);
			}
		} catch (Exception e) {
			LOG.error("Error while registering T_T " + e);
			resp.setStatus(HttpStatus.SC_GONE);
		} finally {
			if (!isSuccess && null != jedis && null != key) {
				jedis.del(key);
			}
		}
	}
}

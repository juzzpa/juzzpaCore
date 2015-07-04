/**
 * 
 */
package com.juzzpa.servlet;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
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
import com.juzzpa.pojos.Login;
import com.juzzpa.utility.DataUtils;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;

/**
 * @author Bharat
 *
 */
@WebServlet(name = "Login", urlPatterns = "/login")
public class LoginServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6348868864132041244L;
	private static final Log LOG = LogFactory.getLog(LoginServlet.class);

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		try {
			String jsonString = JsonUtils.extractJsonStringFromRequest(req);
			Login login = (Login) JsonUtils.validate(jsonString, Login.class);
			Jedis jedis = Database.getJedis();
			if (null != login) {
				if (validate(login, jedis)) {
					resp.setStatus(HttpStatus.SC_OK);
				} else {
					resp.setStatus(HttpStatus.SC_FORBIDDEN);
				}
			} else {
				resp.setStatus(HttpStatus.SC_BAD_REQUEST);
			}
		} catch (Exception e) {
			LOG.error("Error while logging in T_T " + e);
			resp.setStatus(HttpStatus.SC_GONE);
		}
	}

	/**
	 * @param login
	 *            .getUserName()
	 * @param jedis
	 * @return
	 * @throws InvalidKeySpecException
	 * @throws NoSuchAlgorithmException
	 */
	private boolean validate(Login login, Jedis jedis)
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		Map<String, String> map = jedis.hgetAll(login.getUserName());
		if (!map.isEmpty() && null != map.get(Keys.STATE)
				&& 1 <= Integer.parseInt(map.get(Keys.STATE))) {
			if (DataUtils.authenticate(login.getPassword(),
					map.get(Keys.PASSWORD).getBytes(), map.get(Keys.SALT)
					.getBytes())) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

}

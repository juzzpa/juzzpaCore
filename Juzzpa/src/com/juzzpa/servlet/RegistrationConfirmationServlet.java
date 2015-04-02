/**
 * 
 */
package com.juzzpa.servlet;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.juzzpa.utility.Database;

/**
 * @author Bharat
 *
 */
@WebServlet(name="Confirm",urlPatterns="/confirm/*")
public class RegistrationConfirmationServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 170353298412291185L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String key = req.getPathInfo().replace("/", "");
		if(-2 == Database.getJedis().ttl(key)){
			resp.getWriter().println("EXPIRED!");
		}else if(-1 == Database.getJedis().ttl(key)){
			resp.getWriter().println("ALREADY REGISTERED!");
		}else{
			String value = Database.getJedis().get(key);
			System.out.println(value);
			Database.getJedis().del(key);
			Database.getJedis().set(key, value);
			resp.getWriter().println("SUCCESS!");
		}
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

	}

}

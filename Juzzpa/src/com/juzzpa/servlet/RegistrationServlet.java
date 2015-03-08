package com.juzzpa.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpStatus;

import redis.clients.jedis.Transaction;

import com.juzzpa.google.UrlShortener;
import com.juzzpa.pojos.Registration;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;
import com.juzzpa.utility.StringUtils;

public class RegistrationServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final int SEVEN_DAYS = 120;//604800;
	private static final String OK = "OK";
	/**
	 * 
	 */
	private static final long serialVersionUID = -6509883068628261132L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		BufferedReader reader = req.getReader();
		StringBuilder jsonString = new StringBuilder();
		String line;
		while(null != (line=reader.readLine())){
			jsonString.append(line);
		}
		Registration registration = (Registration) JsonUtils.validate(jsonString.toString(), Registration.class);
		if(null != registration){
			if(Database.getJedis().hgetAll(registration.getEmailId()).isEmpty()){
				Map<String, String> map = JsonUtils.jsonToMap(jsonString.toString());
				Transaction transaction = Database.getJedis().multi();
				String result = Database.getJedis().hmset(registration.getEmailId(), map);
				if(OK.equals(result)){
					long set = 0;
					String randomString = null;
					while(0 == set){
						randomString = StringUtils.generateRandomString(6);
						set = Database.getJedis().setnx(randomString, registration.getEmailId());
					}
					Database.getJedis().expire(randomString, SEVEN_DAYS);
					if(null != randomString){
						UrlShortener urlShortener = new UrlShortener();
						String link = urlShortener.shortenUrl(randomString);
						resp.setStatus(HttpStatus.SC_OK);
						System.out.println(link);
						//						MailSender mailSender = new MailSender();
						//						if(mailSender.sendMail(registration,link)) {
						//							resp.setStatus(HttpStatus.SC_OK);
						//						}
					}
				}
			}else{
				resp.setStatus(HttpStatus.SC_BAD_REQUEST);
			}
		}else{
			resp.setStatus(HttpStatus.SC_BAD_REQUEST);
		}
	}
}

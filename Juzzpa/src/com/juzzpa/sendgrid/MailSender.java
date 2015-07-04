package com.juzzpa.sendgrid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.juzzpa.pojos.Registration;
import com.juzzpa.utility.Database;
import com.sendgrid.SendGrid;
import com.sendgrid.SendGridException;

public class MailSender {
	private static final Log LOG = LogFactory.getLog(MailSender.class);

	private static SendGrid sendGrid;
	private static String html = "<html><head><title></title></head><body>Hi [name],\nThanks for registering your activation link is [link]</body></html>";

	public static boolean sendMail(Registration registration, String link) {
		if (null == sendGrid) {
			sendGrid = new SendGrid("juzzpamail", Database.getJedis().get(
					"sendGridKey"));
		}
		SendGrid.Email email = new SendGrid.Email();
		email.addTo(registration.getEmailId());
		email.setFrom("contact@juzzpa.com");
		email.setSubject("Welcome To Juzzpa!");
		email.setHtml(html.replace("[name]", registration.getName()).replace(
				"[link]", link));
		int retryCount = 0;
		while (retryCount < 2) {
			try {
				SendGrid.Response response = sendGrid.send(email);
				if (response.getStatus()) {
					LOG.info("Mail sent to " + registration.getEmailId());
				}
				return response.getStatus();
			} catch (SendGridException e) {
				retryCount++;
				LOG.error("Error while sending mail " + e);
			}
		}
		return false;
	}

	public static boolean sendMail(String emailId, String body) {
		if (null == sendGrid) {
			sendGrid = new SendGrid("juzzpamail", Database.getJedis().get(
					"sendGridKey"));
		}
		SendGrid.Email email = new SendGrid.Email();
		email.addTo(emailId);
		email.setFrom("contact@juzzpa.com");
		email.setSubject("Welcome To Juzzpa!");
		email.setHtml(body);
		int retryCount = 0;
		while (retryCount < 2) {
			try {
				SendGrid.Response response = sendGrid.send(email);
				if (response.getStatus()) {
					LOG.info("Mail sent to " + emailId);
				}
				return response.getStatus();
			} catch (SendGridException e) {
				retryCount++;
				LOG.error("Error while sending mail " + e);
			}
		}
		return false;
	}

}

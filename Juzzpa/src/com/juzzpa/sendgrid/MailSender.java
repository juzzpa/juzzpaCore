package com.juzzpa.sendgrid;

import com.juzzpa.pojos.Registration;
import com.juzzpa.utility.Database;
import com.sendgrid.SendGrid;
import com.sendgrid.SendGridException;

public class MailSender {

	private static SendGrid sendGrid;
	private String html = "<html><head><title></title></head><body>Hi [name],\nThanks for registering your activation link is [link]</body></html>";
	public boolean sendMail(Registration registration, String link){
		if(null == sendGrid) {
			sendGrid = new SendGrid("juzzpa", Database.getJedis().get("sendGridKey"));
		}
		SendGrid.Email email = new SendGrid.Email();
		email.addTo(registration.getEmailId());
		email.setFrom("reach@juzzpa.com");
		email.setSubject("Welcome To Juzzpa!");
		email.setHtml(html.replace("[name]", registration.getName()).replace("[link]", link));
		int retryCount = 0;
		while(retryCount < 2){
			try {
				SendGrid.Response response = sendGrid.send(email);
				if(response.getStatus()) {
					System.out.println("Mail sent to "+registration.getEmailId());
				}
				return response.getStatus();
			} catch (SendGridException e) {
				retryCount ++;
				e.printStackTrace();
			}
		}
		return false;
	}

}

package com.juzzpa.utility;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * @author Bharat
 *
 */
@WebListener
public class CentralConfig implements ServletContextListener {

	private static Properties properties = new Properties();

	/* (non-Javadoc)
	 * @see javax.servlet.ServletContextListener#contextDestroyed(javax.servlet.ServletContextEvent)
	 */
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		Database.closeConnection();
	}

	/* (non-Javadoc)
	 * @see javax.servlet.ServletContextListener#contextInitialized(javax.servlet.ServletContextEvent)
	 */
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {
			properties.load(CentralConfig.class.getClassLoader().getResourceAsStream("config.prop"));
			Database.getConnection();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @return the properties
	 */
	public static Properties getProperties() {
		return properties;
	}

	/**
	 * @param properties the properties to set
	 */
	public static void setProperties(Properties properties) {
		CentralConfig.properties = properties;
	}
}

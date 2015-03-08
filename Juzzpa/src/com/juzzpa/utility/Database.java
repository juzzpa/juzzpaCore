package com.juzzpa.utility;

import redis.clients.jedis.Jedis;

public class Database {

	private static Jedis jedis;

	/**
	 * @return the jedis
	 */
	public static Jedis getJedis() {
		return jedis;
	}

	/**
	 * 
	 */
	protected static void getConnection(){
		String host = CentralConfig.getProperties().getProperty("DB_URL").split(":")[0];
		int port = Integer.parseInt(CentralConfig.getProperties().getProperty("DB_URL").split(":")[1]);
		jedis = new Jedis(host,port);
		jedis.auth(CentralConfig.getProperties().getProperty("DB_PASSWORD"));
		System.out.println("DB Connection made, replied with "+jedis.ping());
	}

	/**
	 * 
	 */
	protected static void closeConnection(){
		jedis.quit();
		System.out.println("DB Connection closed");;
	}

}

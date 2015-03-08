/**
 * 
 */
package com.juzzpa.utility;

import org.apache.commons.lang3.RandomStringUtils;

/**
 * @author Bharat
 *
 */
public class StringUtils {

	public static String generateRandomString(int length){
		return RandomStringUtils.randomAlphanumeric(length);
	}

}

/**
 * 
 */
package com.juzzpa.utility;

import java.io.BufferedReader;
import java.io.IOException;

/**
 * @author Bharat
 *
 */
public class ObjectUtils {

	public static void closeQuietly(Object object){
		try {
			if(object instanceof BufferedReader){
				BufferedReader reader = (BufferedReader) object;
				reader.close();
			}
		} catch (IOException e) {
			System.out.println("Failed to close bufferedReader "+e);
		}

	}
}

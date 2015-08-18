/**
 * 
 */
package com.juzzpa.utility;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author Bharat
 *
 */
public class HTTPUtils {

	private static HttpClient httpClient = HttpClientBuilder.create().build();

	public static HttpResponse postRequest(HttpPost post)
			throws ClientProtocolException, IOException {
		return httpClient.execute(post);
	}

	public static org.json.JSONObject extractResponse(HttpResponse response)
			throws IllegalStateException, IOException, JSONException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				response.getEntity().getContent()));
		String line;
		StringBuilder sb = new StringBuilder();
		while (null != (line = reader.readLine())) {
			sb.append(line);
		}
		JSONObject jsonObject = new JSONObject(sb.toString());
		return jsonObject;
	}

}

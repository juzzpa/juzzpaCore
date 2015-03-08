package com.juzzpa.google;

import org.json.JSONObject;
import org.scribe.builder.ServiceBuilder;
import org.scribe.builder.api.GoogleApi;
import org.scribe.model.OAuthRequest;
import org.scribe.model.Response;
import org.scribe.model.Verb;
import org.scribe.oauth.OAuthService;

import com.google.gson.JsonObject;
import com.juzzpa.utility.CentralConfig;

public class UrlShortener {

	/**
	 * 
	 */
	private static final String longUrl = "http://localhost:8888/confirm/";
	private static OAuthService authService;
	private String url = "https://www.googleapis.com/urlshortener/v1/url";

	public String shortenUrl(String randomString){
		if(null == authService) {
			authService = new ServiceBuilder().provider(GoogleApi.class).apiKey(CentralConfig.getProperties()
					.getProperty("GOOGLE_API_KEY")).apiSecret("anonymous").scope("https://www.googleapis.com/auth/urlshortener").build();
		}
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.POST, url);
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("longUrl", longUrl+randomString);
		oAuthRequest.addHeader("Content-Type", "application/json");
		oAuthRequest.addPayload(jsonObject.toString());
		Response response = oAuthRequest.send();
		JSONObject responseJson = null;
		if(response.isSuccessful()){
			responseJson = new JSONObject(response.getBody());
		}
		return responseJson.getString("id");
	}
}

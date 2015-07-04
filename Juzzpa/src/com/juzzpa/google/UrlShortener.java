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
	private static final String SHORTEN_URL = "SHORTEN_URL";
	/**
	 * 
	 */
	private static final String TRUE = "true";
	/**
	 * 
	 */
	private static final String context = "/confirm/";
	private static OAuthService authService;
	private static String url = "https://www.googleapis.com/urlshortener/v1/url";

	public static String shortenUrl(String longUrl) {
		if (null == authService) {
			authService = new ServiceBuilder()
					.provider(GoogleApi.class)
					.apiKey(CentralConfig.getProperties().getProperty(
							"anonymous")).apiSecret("anonymous")
					.scope("https://www.googleapis.com/auth/urlshortener")
					.build();
		}
		authService.getRequestToken().getRawResponse();
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.POST, url);
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("longUrl", longUrl);
		oAuthRequest.addHeader("Content-Type", "application/json");
		oAuthRequest.addPayload(jsonObject.toString());
		Response response = oAuthRequest.send();
		if (response.isSuccessful()) {
			JSONObject responseJson = new JSONObject(response.getBody());
			return responseJson.getString("id");
		}
		return null;
	}

	public static String createUrl(String rootUrl, String randomString) {
		if (TRUE.equals(CentralConfig.getProperties().get(SHORTEN_URL))) {
			return shortenUrl(rootUrl.concat(context).concat(randomString));
		} else {
			return rootUrl.concat(context).concat(randomString);
		}
	}
}

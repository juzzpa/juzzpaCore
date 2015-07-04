/**
 * 
 */
package com.juzzpa.servlet;

import java.io.IOException;
import java.util.HashSet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpStatus;
import org.json.JSONObject;

import redis.clients.jedis.Jedis;

import com.juzzpa.constants.Keys;
import com.juzzpa.pojos.Store;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;

/**
 * @author Bharat
 *
 */
@WebServlet(name = "AddStore", urlPatterns = "/addStore")
public class AddStoreServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6442297679042956708L;
	private static final Log LOG = LogFactory.getLog(AddStoreServlet.class);

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		try {
			String jsonString = JsonUtils.extractJsonStringFromRequest(req);
			Store store = (Store) JsonUtils.validate(jsonString, Store.class);
			Jedis jedis = Database.getJedis();
			String key = new JSONObject(jsonString).getString(Keys.KEY);
			String state = jedis.hget(key, Keys.STATE);
			if (null != state && 2 <= Integer.parseInt(state)) {
				String storesJson = jedis.hget(key, Keys.STORES);
				if (null == storesJson) {
					HashSet<Store> stores = new HashSet<Store>();
					stores.add(store);
					storesJson = JsonUtils.toJson(stores);
					jedis.hset(key, Keys.STORES, storesJson);
				} else {
					String updatedStoresJson = addStoreToExistingList(
							storesJson, store);
					jedis.hset(key, Keys.STORES, updatedStoresJson);
				}
			} else {
				resp.setStatus(HttpStatus.SC_FORBIDDEN);
			}
		} catch (Exception e) {
			LOG.error("Error while adding store in T_T " + e);
			resp.setStatus(HttpStatus.SC_GONE);
		}
	}

	/**
	 * @param storesJson
	 * @param store
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private String addStoreToExistingList(String storesJson, Store store) {
		HashSet<Store> existingStore = (HashSet<Store>) JsonUtils.fromJson(
				storesJson, HashSet.class);
		existingStore.add(store);
		return JsonUtils.toJson(existingStore);
	}
}

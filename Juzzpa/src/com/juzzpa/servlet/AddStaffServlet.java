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
import com.juzzpa.pojos.Staff;
import com.juzzpa.pojos.StaffMember;
import com.juzzpa.utility.Database;
import com.juzzpa.utility.JsonUtils;

/**
 * 
 */

/**
 * @author Bharat
 *
 */
@WebServlet(name = "AddStaff", urlPatterns = "/addStaff")
public class AddStaffServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9018756033822449530L;
	private static final Log LOG = LogFactory.getLog(AddServicesServlet.class);

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		try {
			String jsonString = JsonUtils.extractJsonStringFromRequest(req);
			Staff staff = (Staff) JsonUtils.validate(jsonString, Staff.class);
			Jedis jedis = Database.getJedis();
			String key = new JSONObject(jsonString).getString(Keys.KEY);
			String state = jedis.hget(key, Keys.STATE);
			if (null != state && 2 <= Integer.parseInt(state)) {
				String staffJson = jedis.hget(key, Keys.STAFF);
				if (null == staffJson) {
					staffJson = JsonUtils.toJson(staff.getStaff());
					jedis.hset(key, Keys.STAFF, staffJson);
				} else {
					String updatedStaffJson = addStaffToExistingList(staffJson,
							staff);
					jedis.hset(key, Keys.STAFF, updatedStaffJson);
				}
			} else {
				resp.setStatus(HttpStatus.SC_FORBIDDEN);
			}
		} catch (Exception e) {
			LOG.error("Error while adding staff in T_T " + e);
			resp.setStatus(HttpStatus.SC_GONE);
		}
	}

	/**
	 * @param staffJson
	 * @param staff
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private String addStaffToExistingList(String staffJson, Staff staff) {
		HashSet<StaffMember> existingStaff = (HashSet<StaffMember>) JsonUtils
				.fromJson(staffJson, HashSet.class);
		existingStaff.addAll(staff.getStaff());
		return JsonUtils.toJson(existingStaff);
	}

}

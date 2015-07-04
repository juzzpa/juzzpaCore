/**
 * 
 */
package com.juzzpa.pojos;

import java.util.HashSet;

/**
 * @author Bharat
 *
 */
public class Staff {

	private HashSet<StaffMember> staff;

	/**
	 * @return the staff
	 */
	public HashSet<StaffMember> getStaff() {
		return staff;
	}

	/**
	 * @param staff
	 *            the staff to set
	 */
	public void setStaff(HashSet<StaffMember> staff) {
		this.staff = staff;
	}

}

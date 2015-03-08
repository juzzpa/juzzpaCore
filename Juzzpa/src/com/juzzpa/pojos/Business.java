/**
 * 
 */
package com.juzzpa.pojos;

/**
 * @author Bharat
 *
 */
public class Business {

	private String businessName;
	private String businessCategory;
	private String businessAddress;
	private String businessContactNumber;

	/**
	 * @return the name
	 */
	public String getName() {
		return businessName;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.businessName = name;
	}
	/**
	 * @return the category
	 */
	public String getCategory() {
		return businessCategory;
	}
	/**
	 * @param category the category to set
	 */
	public void setCategory(String category) {
		this.businessCategory = category;
	}
	/**
	 * @return the address
	 */
	public String getAddress() {
		return businessAddress;
	}
	/**
	 * @param address the address to set
	 */
	public void setAddress(String address) {
		this.businessAddress = address;
	}
	/**
	 * @return the contactNumber
	 */
	public String getContactNumber() {
		return businessContactNumber;
	}
	/**
	 * @param contactNumber the contactNumber to set
	 */
	public void setContactNumber(String contactNumber) {
		this.businessContactNumber = contactNumber;
	}

}

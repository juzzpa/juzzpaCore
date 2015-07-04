/**
 * 
 */
package com.juzzpa.pojos;

import com.juzzpa.annotations.Optional;

/**
 * @author Bharat
 *
 */
public class Business {

	private String businessName;
	private String businessCategory;
	private String businessAddress;
	@Optional
	private String businessContactNumber;
	@Optional
	private String businessEmail;
	@Optional
	private String businessWebsite;
	@Optional
	private String businessFB;
	@Optional
	private String businessTwitter;

	/**
	 * @return the name
	 */
	public String getName() {
		return businessName;
	}

	/**
	 * @param name
	 *            the name to set
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
	 * @param category
	 *            the category to set
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
	 * @param address
	 *            the address to set
	 */
	public void setAddress(String address) {
		this.businessAddress = address;
	}

	/**
	 * @return the businessContactNumber
	 */
	public String getBusinessContactNumber() {
		return businessContactNumber;
	}

	/**
	 * @param businessContactNumber
	 *            the businessContactNumber to set
	 */
	public void setBusinessContactNumber(String businessContactNumber) {
		this.businessContactNumber = businessContactNumber;
	}

	/**
	 * @return the businessEmail
	 */
	public String getBusinessEmail() {
		return businessEmail;
	}

	/**
	 * @param businessEmail
	 *            the businessEmail to set
	 */
	public void setBusinessEmail(String businessEmail) {
		this.businessEmail = businessEmail;
	}

	/**
	 * @return the businessWebsite
	 */
	public String getBusinessWebsite() {
		return businessWebsite;
	}

	/**
	 * @param businessWebsite
	 *            the businessWebsite to set
	 */
	public void setBusinessWebsite(String businessWebsite) {
		this.businessWebsite = businessWebsite;
	}

	/**
	 * @return the businessFB
	 */
	public String getBusinessFB() {
		return businessFB;
	}

	/**
	 * @param businessFB
	 *            the businessFB to set
	 */
	public void setBusinessFB(String businessFB) {
		this.businessFB = businessFB;
	}

	/**
	 * @return the businessTwitter
	 */
	public String getBusinessTwitter() {
		return businessTwitter;
	}

	/**
	 * @param businessTwitter
	 *            the businessTwitter to set
	 */
	public void setBusinessTwitter(String businessTwitter) {
		this.businessTwitter = businessTwitter;
	}

}

// Merchant Registration

var regResponse = "{'status':'200','userId':'1'}";

$(document)
		.ready(
				function() {
					$("#reg")
							.click(
									function() {
										var regName = $("#regName");
										var mobileNumber = $("#mobileNumber");
										var emailId = $("#emailId");
										var password = $("#password");
										var confirmPassword = $("#confirmPassword");

										/* clear error messages */
										$("#regNameEmpty").remove();
										$("#invalidRegName").remove();
										$("#mobileNmuberEmpty").remove();
										$("#invalidMobileNumber").remove();
										$("#invalidEmailId").remove();
										$("#emailEmpty").remove();
										$("#passwordEmpty").remove();
										$("#passwordStrength").remove();
										$("#matchPassword").remove();

										/* Name field check */
										if (regName.val() == "") {
											regName
													.after("<p id='regNameEmpty' class='font-champagne'>"
															+ regNameEmpty
															+ "</p>");
											return;
										} else if (!nameRegex.test(regName
												.val())) {
											regName
													.after("<p id='invalidRegName' class='font-champagne'>"
															+ invalidRegName
															+ "</p>");
											return;
										}

										/* mobileNumber check */
										if (mobileNumber.val() == "") {
											mobileNumber
													.after("<p id='mobileNmuberEmpty' class='font-champagne'>"
															+ mobileNmuberEmpty
															+ "</p>");
											return;
										} else if (!mobileNumberRegex
												.test(mobileNumber.val())) {
											mobileNumber
													.after("<p id='invalidMobileNumber' class='font-champagne'>"
															+ invalidMobileNumber
															+ "</p>");
											return;
										}

										/* Email id field check */
										if (emailId.val() == "") {
											emailId
													.after("<p id='emailEmpty' class='font-champagne'>"
															+ emailEmpty
															+ "</p>");
											return;
										} else if (!(emailRegex.test(emailId
												.val()))) {
											emailId
													.after("<p id='invalidEmailId' class='font-champagne'>"
															+ invalidEmailId
															+ "</p>");
											return;
										}

										/* Password field check */
										if (password.val() == "") {
											password
													.after("<p id='passwordEmpty' class='font-champagne'>"
															+ passwordEmpty
															+ "</p>");
											return;
										} else if (!passwordRegex
												.test(password)) {
											password
													.after("<p id='passwordStrength' class='font-champagne'>"
															+ passwordStrength
															+ "</p>");
											return;
										}

										/* confirmPassword field check */
										if (confirmPassword.val() == "") {
											confirmPassword
													.after("<p id='passwordEmpty' class='font-champagne'>"
															+ passwordEmpty
															+ "</p>");
											return;
										} else if (confirmPassword.val() != password
												.val()) {
											confirmPassword
													.after("<p id='matchPassword' class='font-champagne'>"
															+ matchPassword
															+ "</p>");
											return;
										}

										/*
										 * Send registration request and get
										 * response
										 */
										var result = eval("(" + regResponse
												+ ")");
										if (result.status == '200') {
											/*
											 * Redirecting to business profile
											 * page after successful login
											 */
											$("form#registrationForm").submit();
										}

									});
				});
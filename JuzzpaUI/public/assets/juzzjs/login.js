// JavaScript Document

var loginResponse="{'status':'200','userId':'1'}";

$(document).ready(function() {	
	
	$("#login").click(
		function(){
			var loginId=$("#loginId");
			var loginPassword=$("#loginPassword");			
			
			
			/* Clear the error messages */
			$("#invalidCredentials").remove();
			$("#invalidEmailId").remove();
			$("#emailEmpty").remove();
			
			/* Email id field check*/
			if(loginId.val()==""){
				loginId.after("<p id='emailEmpty' class='font-champagne'>"+emailEmpty+"</p>");	
				return;
			}else if(!(emailRegex.test(loginId.val()))){		
				loginId.before("<p id='invalidEmailId' class='centered font-champagne'>"+invalidEmailId+"</p>");
				return;
			}
			
			/* Password field check */
			if(loginPassword.val()==""){
				loginPassword.after("<p id='passwordEmpty' class='font-champagne'>"+passwordEmpty+"</p>");	
				return;
			}
		
			/* Send login request and get response */
			var result=eval ("(" + loginResponse + ")");
			if(result.status!='200'){
				loginId.before("<p id='invalidCredentials' class='centered font-champagne'>"+invalidCredentials+"</p>");
			}else{
				/* Redirecting to business profile page after successful login */
				window.location.href = "Set_bu_profile.html";
			}			
		
		}
	);
});



//business details

var regResponse="{'status':'200','userId':'1'}";

$(document).ready(function() {
	
    $("#boDetails").click(
		function(){
			var boName=$("#boName");
			var boAddress=$("#boAddress");
			var mobileNumber=$("#mobileNumber");
			
			/* clear error messages */
			$("#regNameEmpty").remove();
			$("#invalidRegName").remove();
			$("#boAddressEmpty").remove();
			$("#mobileNmuberEmpty").remove();
			$("#invalidMobileNumber").remove();
			
			
			/* Name field check */
			if(boName.val()==""){
				boName.after("<p id='regNameEmpty' class='font-champagne'>"+regNameEmpty+"</p>");	
				return;
			}else if(!nameRegex.test(boName.val())){
				boName.after("<p id='invalidRegName' class='font-champagne'>"+invalidRegName+"</p>");
				return;
			}
			
			/* mobileNumber check */
			if(mobileNumber.val()==""){
				mobileNumber.after("<p id='mobileNmuberEmpty' class='font-champagne'>"+mobileNmuberEmpty+"</p>");	
				return;
			}else if(!mobileNumberRegex.test(mobileNumber.val())){
				mobileNumber.after("<p id='invalidMobileNumber' class='font-champagne'>"+invalidMobileNumber+"</p>");
				return;
			}
			
			/* business owner address check */
			if(boAddress.val()==""){
				boAddress.after("<p id='boAddressEmpty' class='font-champagne'>"+buAddressEmpty+"</p>");	
				return;
			}
			
			/* Send registration request and get response */
			var result=eval ("(" + regResponse + ")");
			if(result.status=='200'){
				/* Redirecting to business profile page after successful login */
				window.location.href = "Set_initial_service.html";
			}
				
		}
	);
});
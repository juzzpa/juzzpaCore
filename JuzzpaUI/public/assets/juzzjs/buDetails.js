//business details

var category="{'category':[{'name':'catA'},{'name':'catB'},{'name':'catC'},{'name':'catD'}]}";
var regResponse="{'status':'200','userId':'1'}";

$(document).ready(function() {
	
	var cList=eval (" ("+category+") ");
	var i;
	for(i=0;i<cList.category.length;i++){
		var name=cList.category[i].name;
		$("#category").append("<option value="+name+">"+name+"</option>");
	}
	
    $("#buDetails").click(
		function(){
			var buName=$("#buName");
			var buAddress=$("#buAddress");
			var buContact=$("#buContact");
			var mobileNumber=$("#mobileNumber");
			var emailId=$("#emailId");
			
			/* clear error messages */
			$("#regNameEmpty").remove();
			$("#invalidRegName").remove();
			$("#buAddressEmpty").remove();
			$("#contactEmpty").remove();
			$("#invalidContact").remove();
			$("#mobileNmuberEmpty").remove();
			$("#invalidMobileNumber").remove();
			$("#invalidEmailId").remove();
			
			
			/* Name field check */
			if(buName.val()==""){
				buName.after("<p id='regNameEmpty' class='font-champagne'>"+regNameEmpty+"</p>");	
				return;
			}else if(!nameRegex.test(buName.val())){
				buName.after("<p id='invalidRegName' class='font-champagne'>"+invalidRegName+"</p>");
				return;
			}
			
			/* business contact check */
			if(buAddress.val()==""){
				buAddress.after("<p id='buAddressEmpty' class='font-champagne'>"+buAddressEmpty+"</p>");	
				return;
			}
			
			/* business contact check */
			if(buContact.val()==""){
				buContact.after("<p id='contactEmpty' class='font-champagne'>"+contactEmpty+"</p>");	
				return;
			}else if(!mobileNumberRegex.test(buContact.val())){
				buContact.after("<p id='invalidContact' class='font-champagne'>"+invalidContact+"</p>");
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
			
			/* Email id field check*/
			if(emailId.val()!=""){
				if(!(emailRegex.test(emailId.val()))){		
					emailId.after("<p id='invalidEmailId' class='font-champagne'>"+invalidEmailId+"</p>");
					return;
				}
			}
			
			/* Send registration request and get response */
			var result=eval ("(" + regResponse + ")");
			if(result.status=='200'){
				/* Redirecting to business profile page after successful login */
				window.location.href = "Set_bo_profile.html";
			}
				
		}
	);
	
	
	$("#buProfile").click(
		function(){
			var buName=$("#buName");
			var buAddress=$("#buAddress");
			var buContact=$("#buContact");
			var mobileNumber=$("#mobileNumber");
			var emailId=$("#emailId");
			
			/* clear error messages */
			$("#regNameEmpty").remove();
			$("#invalidRegName").remove();
			$("#buAddressEmpty").remove();
			$("#contactEmpty").remove();
			$("#invalidContact").remove();
			$("#mobileNmuberEmpty").remove();
			$("#invalidMobileNumber").remove();
			$("#invalidEmailId").remove();
			$("#updateSuccess").remove();
			
			
			/* Name field check */
			if(buName.val()==""){
				buName.after("<p id='regNameEmpty' class='font-champagne'>"+regNameEmpty+"</p>");	
				return;
			}else if(!nameRegex.test(buName.val())){
				buName.after("<p id='invalidRegName' class='font-champagne'>"+invalidRegName+"</p>");
				return;
			}
			
			/* business contact check */
			if(buAddress.val()==""){
				buAddress.after("<p id='buAddressEmpty' class='font-champagne'>"+buAddressEmpty+"</p>");	
				return;
			}
			
			/* business contact check */
			if(buContact.val()==""){
				buContact.after("<p id='contactEmpty' class='font-champagne'>"+contactEmpty+"</p>");	
				return;
			}else if(!mobileNumberRegex.test(buContact.val())){
				buContact.after("<p id='invalidContact' class='font-champagne'>"+invalidContact+"</p>");
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
			
			/* Email id field check*/
			if(emailId.val()!=""){
				if(!(emailRegex.test(emailId.val()))){		
					emailId.after("<p id='invalidEmailId' class='font-champagne'>"+invalidEmailId+"</p>");
					return;
				}
			}
			
			/* Send registration request and get response */
			var result=eval ("(" + regResponse + ")");
			if(result.status=='200'){
				/* Redirecting to business profile page after successful login */

				$("#buProfile").css("display","none");
				$("#modifyProfile").css("display","block");
				$("#reset").css("display","none");
				$("input").removeClass("juzz-form").addClass("juzz-form1").attr("disabled");
				$("select").removeClass("juzz-form").addClass("juzz-form1").attr("disabled");	
				buName.before("<p id='updateSuccess' class='font-champagne'>"+updateSuccess+"</p>");
			}
				
		}
	);
	
	$("#modifyProfile").click(
		function(){
			$("#buProfile").css("display","block");
			$("#modifyProfile").css("display","none");
			$("#reset").css("display","block");
			$("input").removeClass("juzz-form1").addClass("juzz-form").removeAttr("disabled");
			$("select").removeClass("juzz-form1").addClass("juzz-form").removeAttr("disabled");			
		}
	);
	
});
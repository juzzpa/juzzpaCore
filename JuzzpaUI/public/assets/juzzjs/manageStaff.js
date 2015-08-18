//Manage services

var addedServices="{'ase':[{'name':'sa'},{'name':'sb'}]}";
var addedStaff="{'asf':[{'name':'sf1'},{'name':'sf2'}]}";
var regResponse="{'status':'200','userId':'1'}";
var viewService="{'service':[{'servicename':'serviceA','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'1'},{'servicename':'serviceB','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'3'},{'servicename':'serviceC','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'3'},{'servicename':'serviceD','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'4'}]}"

$(document).ready(function() {
	var i;
	
	var addedStaffList=eval("("+addedStaff+")");
	if(addedStaffList.asf.length>1){
		$("#staffspan").text("Add more");
		$("#next").removeAttr("disabled");
	}
	
	var addedServiceList=eval("("+addedServices+")");
	for(i=0;i<addedServiceList.ase.length;i++){
		var name=addedServiceList.ase[i].name;
		$("#addedServices").append("<option value='"+name+"'>"+name+"</option>");
	}
	
	//load the added services initially	
	var viewServiceList=eval("("+viewService+")");
	for(i=0;i<viewServiceList.service.length;i++){
		var serviceImg=viewServiceList.service[i].serviceimg;
		var serviceName=viewServiceList.service[i].servicename;
		var serviceDesc=viewServiceList.service[i].serviceDesc;
		var serviceId=viewServiceList.service[i].serviceId;
		
		var newService="<div id='"+serviceId+"' class='col-sm-3 centered' style='border:1px solid white;height:280px;width:200px;margin:5px;'>";
		newService+="<img id='serviceImg' src='"+serviceImg+"' class='img-circle margin10' width='100' height='100'/><br>";
		newService+="<div style='overflow:auto;height:120px;'>";
		newService+="<p id='serviceName' class='font-champagne font-medium centered'>"+serviceName+"</p>";
		newService+="<p id='serviceDesc' class='font-champagne'>"+serviceDesc+"</p>";
		newService+="</div>";
		newService+="<button type='button' style='position:absolute;width:50%;left:0;bottom:0' class='juzz-button juzz-default font-champagne'>Modify</button>";
		newService+="<button id='delete' type='button' style='position:absolute;width:50%;right:0;bottom:0' class='juzz-button juzz-theme1 font-champagne'>Delete</button>";
		newService+="</div>";
				
		$("#row").append(newService);
	}
	
	$("#initialStaff").click(
		function(){
			var name=$("#staffName");
			var mobileNumber=$("#mobileNumber");
			var emailId=$("#emailId");
			
			$("#regNameEmpty").remove();
			$("#invalidRegName").remove();
			$("#mobileNmuberEmpty").remove();
			$("#invalidMobileNumber").remove();
			$("#invalidEmailId").remove();
			$("#emailEmpty").remove();
			
			/* Name field check */
			if(name.val()==""){
				name.after("<p id='regNameEmpty' class='font-champagne'>"+regNameEmpty+"</p>");	
				return;
			}else if(!nameRegex.test(name.val())){
				name.after("<p id='invalidRegName' class='font-champagne'>"+invalidRegName+"</p>");
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
			if(emailId.val()==""){
				emailId.after("<p id='emailEmpty' class='font-champagne'>"+emailEmpty+"</p>");	
				return;
			}else if(!(emailRegex.test(emailId.val()))){		
				emailId.after("<p id='invalidEmailId' class='font-champagne'>"+invalidEmailId+"</p>");
				return;
			}
			
			
			/* Send add staff request and get response */
			var result=eval ("(" + regResponse + ")");
			if(result.status=='200'){
				/* Redirecting to business profile page after successful login */
				$("#minStaff").remove();
				$("#staffSuccess").remove();
				$("#staffName").before("<p id='staffSuccess' class='font-champagne centered'>"+staffSuccess+"</p>");
			}
		}
	);
	
	$("#next").click(
		function(){
			if(addedStaffList.asf.length>=1){
				window.location.href="Set_initial_store.html";
			}else{
				$("#minStaff").remove();
				$("#staffSuccess").remove();
				$("#staffName").before("<p id='minStaff' class='font-champagne centered'>"+minStaff+"</p>");
			}
		}
	);
	
	$("#addStaff").click(
		function(){
			var name=$("#staffName");
			var mobileNumber=$("#mobileNumber");
			var emailId=$("#emailId");
			
			$("#regNameEmpty").remove();
			$("#invalidRegName").remove();
			$("#mobileNmuberEmpty").remove();
			$("#invalidMobileNumber").remove();
			$("#invalidEmailId").remove();
			$("#emailEmpty").remove();
			
			/* Name field check */
			if(name.val()==""){
				name.after("<p id='regNameEmpty' class='font-champagne'>"+regNameEmpty+"</p>");	
				return;
			}else if(!nameRegex.test(name.val())){
				name.after("<p id='invalidRegName' class='font-champagne'>"+invalidRegName+"</p>");
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
			if(emailId.val()==""){
				emailId.after("<p id='emailEmpty' class='font-champagne'>"+emailEmpty+"</p>");	
				return;
			}else if(!(emailRegex.test(emailId.val()))){		
				emailId.after("<p id='invalidEmailId' class='font-champagne'>"+invalidEmailId+"</p>");
				return;
			}
			
			
			/* Send add staff request and get response */
			var result=eval ("(" + regResponse + ")");
			if(result.status=='200'){
				var serviceImg="assets/img/b1.png";
				var serviceName=$("#masterService").val();
				
				var newService="<div data-id='2' class='col-sm-3 centered' style='border:1px solid white;height:280px;width:200px;margin:5px;'>";
                newService+="<img id='serviceImg' src='"+serviceImg+"' class='img-circle margin10' width='100' height='100'/><br>";
                newService+="<div style='overflow:auto;height:120px;'>";
                newService+="<p id='serviceName' class='font-champagne font-medium centered'>"+serviceName+"</p>";
                newService+="<p id='serviceDesc' class='font-champagne'>Enjoy the servie like nature comes and gives you bloody hell of a massage. and dont forget to click on the subscriber button below;)</p>";
                newService+="</div>";
                newService+="<button type='button' style='position:absolute;width:50%;left:0;bottom:0' class='juzz-button juzz-default font-champagne'>Modify</button>";
                newService+="<button id='delete' type='button' style='position:absolute;width:50%;right:0;bottom:0' class='juzz-button juzz-theme1 font-champagne'>Delete</button>";
            	newService+="</div>";
								
				$("#row").append(newService);
			}
		}
	);
	
	//toggle of add form when clicked on plus sign
	$("#plus").click(
		function(){
			if($("#add").is(":visible")){
				$("#add").fadeOut(500,function(){$("#main").css("margin-left","0px");});				
			}else{
				$("#add").fadeIn(500);
				$("#main").css("margin-left","300px");
			}
		}
	);
	
	$( window ).resize(function(){
		if($(window).width() < 600){
			$("#add").css("display","none");
			$("#main").css("margin-left","0px");
		}else{
			$("#add").css("display","block");
			$("#main").css("margin-left","300px");
		}
	});
	
	//for performing delete operation
	$(document).on("click","#delete",function(){
		$(this).parent().remove();
	});	
	
});
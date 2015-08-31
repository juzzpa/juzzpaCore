//Manage staffs

var gender=[{name:"Male"},{name:"Female"}];
var regResponse="{'status':'200','userId':'1'}";
var addedStaff="{'staff':[{'name':'sandy1','gender':'male','img':'assets/img/user.png','id':'1','mobile':'9989989988','address':'#99,sdafjl,flasjf,','emailId':'san@g.cm','fburl':'','photoId':'','idproof':''}]}";
var addedStaffObj=eval("("+addedStaff+")");

$(document).ready(function() {
			
	//toggle of add form when clicked on plus sign
	$("#plus").click(
		function(){
			if($("#add").is(":visible")){
				$("#add").fadeOut(500);
				$("#main").css({"margin-left":"0px","transition":"margin-left 2s"});				
			}else{
				$("#main").css({"margin-left":"410px","transition":"margin-left 2s"});
				$("#add").fadeIn(2000);				
			}
		}
	);
	
	$( window ).resize(function(){
		if($(window).width() < 600){
			$("#add").css("display","none");
			$("#main").css("margin-left","0px");
		}else{
			$("#add").css("display","block");
			$("#main").css("margin-left","410px");
		}
	});
	
});

var app=angular.module("staff",[]);
app.controller("staffctrl",function($scope){
	$scope.gender=gender;
	$scope.sex=gender[0].name;
	$scope.viewStaff=addedStaffObj.staff;
	$scope.addstaff=function(){
		
		if(emptyCheck($scope.sname)){$scope.addError=regNameEmpty;return};
		
		if(emptyCheck($scope.mobileNumber)){$scope.addError=mobileNmuberEmpty;return};
		if(!mobileNumberRegex.test($scope.mobileNumber)){$scope.addError=invalidMobileNumber;return};
		
		if(emptyCheck($scope.address)){$scope.addError=addressEmpty;return};
		
		if(!emptyCheck($scope.emailId))
			if(!emailRegex.test($scope.emailId)){$scope.addError=invalidEmailId;return};
			
		alert($scope.sex);
		
		var newstaff={};
		newstaff.name=$scope.sname;
		newstaff.gender=$scope.sex;
		newstaff.mobile=$scope.mobileNumber;
		newstaff.address=$scope.address;
		newstaff.fburl=$scope.fburl;
		newstaff.img="assets/img/user.png";
		
		alert(JSON.stringify(newstaff));
		if(!emptyCheck($scope.emailId))
			newstaff.emailId=$scope.emailId;
			
		addedStaffObj.staff.push(newstaff);
		alert(JSON.stringify(newstaff));
		$scope.x.push(addedStaffObj);	
		
	}
	
	$scope.deleteStore=function(index){
		addedStaffObj.staff.splice(index,1);
	}
});

function emptyCheck(str){
	if(str=="" || str=="undefined" || str==undefined || str==null || str=="null")return true;
	else return false;
}

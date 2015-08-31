//business details

var category="{'category':[{'name':'catA'},{'name':'catB'},{'name':'catC'},{'name':'catD'}]}";
var regResponse="{'status':'200','userId':'1'}";
var res=eval("("+regResponse+")");
var catResponse=eval("("+category+")");
var catObj=[];
var i;

for(i=0;i<catResponse.category.length;i++){catObj.push(catResponse.category[i].name)}

function upload(){
	   var preview = document.getElementById("uploadImg"); //selects the query named img
	   var file    = document.querySelector('input[type=file]').files[0];
       var reader  = new FileReader();
	   reader.onload =function(){
			preview.src=reader.result;
	   }
       reader.readAsDataURL(file);
}

var app=angular.module("budetails",[]);
app.controller("buctrl",function($scope){
	$scope.category=catObj;
	$scope.bucategory=catObj[0];
	$scope.budetails=function(){
		$scope.validEmail=false;
		$scope.validName=false;
		$scope.validAddress=false;
		$scope.validContact=false;
		$scope.validMobileNumber=false;
		
		if(emptyCheck($scope.buName)){$scope.validName=regNameEmpty;return};
		
		if(emptyCheck($scope.buAddress)){$scope.validAddress=buAddressEmpty;return};
		
		if(emptyCheck($scope.buContact)){$scope.validContact=contactEmpty;return};
		if(!mobileNumberRegex.test($scope.buContact)){$scope.validContact=invalidContact;return};
		
		if(emptyCheck($scope.mobileNumber)){$scope.validMobileNumber=mobileNmuberEmpty;return};
		if(!mobileNumberRegex.test($scope.mobileNumber)){$scope.validMobileNumber=invalidMobileNumber;return};
		
		if(emptyCheck($scope.emailId)){$scope.validEmail=emailEmpty;return};
		if(!emailRegex.test($scope.emailId)){$scope.validEmail=invalidEmailId;return};
		
		if(res.status=="200"){
			window.location.href = "SuccessBusinessDetails.html";
		}
		
	}
	
	
});

function emptyCheck(str){
	if(str=="" || str=="undefined" || str==undefined || str==null || str=="null")return true;
	else return false;
}
//business details

var category="{'category':[{'name':'catA'},{'name':'catB'},{'name':'catC'},{'name':'catD'}]}";
var regResponse="{'status':'200','userId':'1'}";
var budetails="{'name':'fassos','mobileNumber':'8759485754','img':'assets/img/user.png','contact':'465464646','website':'www.www.com','fburl':'www.fb.com','twitterurl':'twitter','address':'splitsvilla','emailId':'adva@gac.com'}";
var budetailsObj=eval("("+budetails+")");
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

var app=angular.module("myprofile",[]);
app.controller("myprofilectrl",function($scope){
	$scope.category=catObj;
	$scope.bucategory=catObj[0];
	$scope.pevents="pointer-events:none;opacity:0.7";	
	$scope.name=budetailsObj.name;
	$scope.mobileNumber=budetailsObj.mobileNumber;
	$scope.contact=budetailsObj.contact;
	$scope.address=budetailsObj.address;
	$scope.website=budetailsObj.website;
	$scope.fburl=budetailsObj.fburl;
	$scope.twitterurl=budetailsObj.twitterurl;
	$scope.emailId=budetailsObj.emailId;
	
	$scope.modifyDetails=function(){
		$scope.validEmail=false;
		$scope.validName=false;
		$scope.validAddress=false;
		$scope.validContact=false;
		$scope.validMobileNumber=false;
			
		if(emptyCheck($scope.name)){$scope.validName=regNameEmpty;return};
		
		if(emptyCheck($scope.address)){$scope.validAddress=buAddressEmpty;return};
		
		if(emptyCheck($scope.contact)){$scope.validContact=contactEmpty;return};
		if(!mobileNumberRegex.test($scope.contact)){$scope.validContact=invalidContact;return};
		
		if(emptyCheck($scope.mobileNumber)){$scope.validMobileNumber=mobileNmuberEmpty;return};
		if(!mobileNumberRegex.test($scope.mobileNumber)){$scope.validMobileNumber=invalidMobileNumber;return};
		
		if(emptyCheck($scope.emailId)){$scope.validEmail=emailEmpty;return};
		if(!emailRegex.test($scope.emailId)){$scope.validEmail=invalidEmailId;return};
		
		$scope.hideError=true;
		$scope.updateSuccess="Business details are updated";
		$scope.pevents="pointer-events:none;opacity:0.7";	
		$scope.showupdate=false;
		
			
	}
		
	$scope.hideAlert=function(sindex){
		$scope.updateSuccess="";
		$scope.hideError=false;
		return;
	}	
	
	
});

function emptyCheck(str){
	if(str=="" || str=="undefined" || str==undefined || str==null || str=="null")return true;
	else return false;
}
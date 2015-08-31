// JavaScript Document

var loginResponse="{'status':'200','userId':'1'}";

var res=eval("("+loginResponse+")");


var app=angular.module("login",[]);

app.controller("loginCtrl",function($scope){
	$scope.login=function(){
		
		$scope.validEmail=false;
		$scope.validPassword=false;
		
		if(emptyCheck($scope.mEmail)){$scope.validEmail=emailEmpty;return};
		
		if(emptyCheck($scope.mPassword)){$scope.validPassword=passwordEmpty;return};
		
		if(res.status=="200"){
			window.location.href = "Set_bu_profile.html";
		}
	}
});

function emptyCheck(str){
	if(str=="" || str=="undefined" || str==undefined || str==null || str=="null")return true;
	else return false;
}

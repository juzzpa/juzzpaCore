var count=10;

var app=angular.module("regSuccess",[]);
app.controller("regCtrl",function($scope,$interval){
	$scope.timer=count;
	$interval(function(){
		count=count-1;
		if(count<1){
			window.location.href="loginPage.html";
		}
		$scope.timer=count;
	},1000
	);
});
//Manage services

var services="{'services':[{'id':'1','name':'serviceA'},{'id':'2','name':'serviceB'},{'id':'3','name':'serviceC'},{'id':'4','name':'serviceD'}]}";
var regResponse="{'status':'200','userId':'1'}";
var addedServices="{'service':[{'servicename':'serviceA','serviceimg':'assets/img/user.png','serviceDesc':'enjoy the massage','serviceId':'1'},{'servicename':'serviceB','serviceimg':'assets/img/serviceimg.jpg','serviceDesc':'enjoy the massage'}]}"
var servicesObj=eval("("+services+")");
var addedServicesObj=eval("("+addedServices+")");

var serviceList=[];
for(i=0;i<servicesObj.services.length;i++) serviceList.push(servicesObj.services);

$(document).ready(function() {
			
	//toggle of add form when clicked on plus sign
	$("#plus").click(
		function(){
			if($("#add").is(":visible")){
				$("#add").fadeOut(500,function(){$("#main").css({"margin-left":"0px","transition":"margin-left 2s"});});				
			}else{
				$("#main").css({"margin-left":"300px","transition":"margin-left 2s"});
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
			$("#main").css("margin-left","300px");
		}
	});
	
});

var app=angular.module("service",[]);
app.controller("servicectrl",function($scope){
	$scope.service=servicesObj.services;
	$scope.masterService=servicesObj.services[0];
	$scope.viewService=addedServicesObj.service;
	$scope.deleteService=function(index){
		addedServicesObj.service.splice(index,1);
		$scope.x.splice(index,1);
	}
	$scope.addService=function(index){
		var newService={};
		newService.servicename=servicesObj.services[index-1].name;
		newService.serviceDesc="dont enjoy please";
		newService.serviceimg="assets/img/user.jpg";
		addedServicesObj.service.push(newService);
		$scope.x.push(newService);
	}
});

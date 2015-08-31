//Manage stores

var stores="{'stores':[{'id':'1','name':'storeA'},{'id':'2','name':'storeB'},{'id':'3','name':'storeC'},{'id':'4','name':'storeD'}]}";
var services="{'services':[{'id':'1','name':'serviceA'},{'id':'2','name':'serviceB'},{'id':'3','name':'serviceC'},{'id':'4','name':'serviceD'}]}";
var regResponse="{'status':'200','userId':'1'}";
var addedStores="{'store':[{'storename':'storeA','storeimg':'assets/img/user.png','storeDesc':'enjoy the massage','storeId':'1','storeService':[{'id':'1','name':'serviceA'}]},{'storename':'storeB','storeimg':'assets/img/serviceimg.jpg','storeDesc':'enjoy the massage','storeService':[{'id':'3','name':'serviceC'},{'id':'2','name':'serviceB'}],'storeId':'2'}]}";
var storesObj=eval("("+stores+")");
var serviceObj=eval("("+services+")");
var addedStoresObj=eval("("+addedStores+")");

var storeList=[];
var serviceList=[];
for(i=0;i<storesObj.stores.length;i++) storeList.push(storesObj.stores);
for(i=0;i<serviceObj.services.length;i++) {serviceObj.services[i].checked=false;serviceList.push(serviceObj.services)};

$(document).ready(function() {
			
	//toggle of add form when clicked on plus sign
	$("#plus").click(
		function(){
			if($("#add").is(":visible")){
				$("#add").fadeOut(500);
				$("#main").css({"margin-left":"0px","transition":"margin-left 2s"});				
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

var app=angular.module("store",[]);
app.controller("storectrl",function($scope){
	$scope.store=storesObj.stores;
	$scope.service=serviceObj.services;
	$scope.masterStore=storesObj.stores[0];
	$scope.masterService=serviceObj.services[0];
	$scope.viewStore=addedStoresObj.store;
	$scope.deleteStore=function(index){
		addedStoresObj.store.splice(index,1);
		$scope.x.splice(index,1);
	}
	$scope.addStore=function(sid){
		var newStore={};
		var m,id,l;
		var storeService=[]	;
		var addedServiceIds=[];
		var n=0;
		var sindex;
		var nocheck=true;
		var oldstore=false;
		var oldservice=false;
		
		for(m=0;m<addedStoresObj.store.length;m++){
			if(addedStoresObj.store[m].storeId==sid){oldstore=true;sindex=m;break;}
		}
		
		for(m=0;m<serviceObj.services.length;m++){
			if(serviceObj.services[m].checked==true){nocheck=false;break;}
		}		
		
		if(nocheck==true){$scope.storeError="Please select atleast one service for your store";return;}
		
		alert(oldstore);
		
		$scope.storeError="";
		
		if(oldstore){
			for(m=0;m<serviceObj.services.length;m++){		
				oldservice=false;
				
				if(serviceObj.services[m].checked==true){
					var newService={};
					id=serviceObj.services[m].id;
					newService.name=serviceObj.services[m].name;
					newService.id=serviceObj.services[m].id;
					
					for(l=0;l<addedStoresObj.store[sindex].storeService.length;l++){
						if(addedStoresObj.store[sindex].storeService[l].id==id){
							oldservice=true;
							l=0;
							break;							
						}
					}
					
					if(!oldservice){
						addedStoresObj.store[sindex].storeService.push(newService);
					}					
				}
			}
			m=0
			
		}else{
			for(m=0;m<serviceObj.services.length;m++){			
				if(serviceObj.services[m].checked==true){
					var newService={};
					newService.name=serviceObj.services[m].name;
					newService.id=serviceObj.services[m].id;
					storeService.push(newService);
				}
			}
			m=0;			
			
			for(n=0;n<storesObj.stores.length;n++){
				if(storesObj.stores[n].id==sid){sindex=n;break;}
			}
			n=0;
			
			newStore.storeService=storeService;		
			newStore.storename=storesObj.stores[sindex].name;
			newStore.storeDesc="dont enjoy please";
			newStore.storeimg="assets/img/user.jpg";
			newStore.storeId=sid;
	
			addedStoresObj.store.push(newStore);
			$scope.x.push(newStore);
		}
	}
	
	$scope.deleteService=function(sindex,seindex){
		
		if(addedStoresObj.store[sindex].storeService.length==1)
		{
			addedStoresObj.store[sindex].serviceError="At least one service must be present";
			addedStoresObj.store[sindex].hideError=true;
			return;
		}
		addedStoresObj.store[sindex].storeService.splice(seindex,1);
	}
	
	$scope.udpateStore=function(sindex){
		addedStoresObj.store[sindex].serviceError="Store updated";
		addedStoresObj.store[sindex].hideError=true;
		return;
	}
	
	$scope.hideAlert=function(sindex){
		addedStoresObj.store[sindex].serviceError="";
		addedStoresObj.store[sindex].hideError=false;
		return;
	}	
});

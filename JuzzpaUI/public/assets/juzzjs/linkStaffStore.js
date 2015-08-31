var addedStaff="{'staff':[{'name':'sandy1','gender':'male','img':'assets/img/user.png','id':'1','mobile':'9989989988','address':'#99,sdafjl,flasjf,','emailId':'san@g.cm','fburl':'','photoId':'','idproof':'','storeId':'2'},{'name':'poornima','gender':'female','img':'assets/img/serviceimg.jpg','id':'2','mobile':'9989989988','address':'#99,sdafjl,flasjf,','emailId':'san@g.cm','fburl':'','photoId':'','idproof':''}]}";
var addedStores="{'store':[{'storename':'storeA','storeimg':'assets/img/user.png','storeDesc':'enjoy the massage','storeId':'1','storeService':[{'id':'1','name':'serviceA'}]},{'storename':'storeB','storeimg':'assets/img/serviceimg.jpg','storeDesc':'enjoy the massage','storeService':[{'id':'3','name':'serviceC'},{'id':'2','name':'serviceB'}],'storeId':'2'}]}";
var addedStaffObj=eval("("+addedStaff+")");
var addedStoreObj=eval("("+addedStores+")");

var app=angular.module("linkstaff",[]);
app.controller("linkstaffctrl",function($scope){
	$scope.addedStaff=addedStaffObj.staff;
	$scope.addedStore=addedStoreObj.store;
	$scope.masterStore=addedStoreObj.store[0].storeId;
	$scope.createform=function(index){
		$scope.staffimg=addedStaffObj.staff[index].img;
		$scope.staffname=addedStaffObj.staff[index].name;
		$scope.staffid=addedStaffObj.staff[index].id;
		$scope.showupdate=true;
		$scope.staffindex=index;
		
		if(!emptyCheck(addedStaffObj.staff[index].storeId)){
			$scope.masterStore=addedStaffObj.staff[index].storeId;
		}
		else{
			$scope.masterStore=addedStoreObj.store[0].storeId;
		}
	}
	$scope.hideAlert=function(){
		$scope.linksuccess="";
		$scope.hideError=false;
		return;
	}
	$scope.update=function(storeid,staffid,staffindex){
		alert(storeid+":"+staffid+":"+staffindex);
		$scope.linksuccess="Staff linked successfully";
		$scope.hideError=true;
		addedStaffObj.staff[staffindex].storeId=storeid;
	}
});

function emptyCheck(str){
	if(str=="" || str=="undefined" || str==undefined || str==null || str=="null")return true;
	else return false;
}
//Appointments

var response="{'staff':[{'id':'s1','name':'Tom','photo':'http://cdn2.gossipcenter.com/sites/default/files/imagecache/story_header/photos/tom-cruise-020514sp.jpg','appointments':[{'aid':'a1s1','date':'18-07-2015','starttime':'9:00','endtime':'9:30','custname':'sanjeev','custMob':'9854685456','custEmail':'sanjeev@gmail.com'},{'aid':'a2s1','date':'18-07-2015','starttime':'10:00','endtime':'11:45','custname':'sanjeev','custMob':'9854685456','custEmail':'sanjeev@gmail.com'}]},{'id':'s2','name':'Maria','photo':'http://thewallmachine.com/files/1363603040.jpg','appointments':[{'aid':'a1s2','date':'18-07-2015','starttime':'9:00','endtime':'9:30','custname':'sanjeev','custMob':'9854685456','custEmail':'sanjeev@gmail.com'},{'aid':'a2s2','date':'18-07-2015','starttime':'11:00','endtime':'11:45','custname':'sanjeev','custMob':'9854685456','custEmail':'sanjeev@gmail.com'}]},{'id':'s3','name':'James','photo':'http://georgesjournal.files.wordpress.com/2012/02/007_at_50_ge_pierece_brosnan.jpg','appointments':[{'aid':'a1s3','date':'18-07-2015','starttime':'9:00','endtime':'9:30','custname':'sanjeev','custMob':'9854685456','custEmail':'sanjeev@gmail.com'},{'aid':'a2s3','date':'18-07-2015','starttime':'10:00','endtime':'11:45','custname':'sanjeev','custMob':'9854685456','custEmail':'sanjeev@gmail.com'},{'aid':'a3s3','date':'18-07-2015','starttime':'12:00','endtime':'13:45','custname':'sanjeev','custMob':'9854685456','custEmail':'sanjeev@gmail.com'}]}]}";

var staffObj=eval("("+response+")");
var hrObj=[];
var minObj=[];
var i,j;

for(i=0;i<24;i++)hrObj.push(i);
for(i=0;i<60;i++)minObj.push(i);

for(i=0;i<staffObj.staff.length;i++){
	for(j=0;j<staffObj.staff[i].appointments.length;j++){
		var st=staffObj.staff[i].appointments[j].starttime;
		var et=staffObj.staff[i].appointments[j].endtime;
		staffObj.staff[i].appointments[j].width=getAppointmentWidth(st,et);
		staffObj.staff[i].appointments[j].leftIndex=getLeftIndex(st);
		staffObj.staff[i].appointments[j].starttimehr=gethr(st);
		staffObj.staff[i].appointments[j].starttimemin=getMin(st);
		staffObj.staff[i].appointments[j].endtimehr=gethr(et);
		staffObj.staff[i].appointments[j].endtimemin=getMin(et);
	}
}

var date=todayDate();

/* initialize the existing appointments in the response */
var app=angular.module("appointment",[]);
app.controller("appCtrl",function($scope){
	$scope.staff=staffObj.staff;
	$scope.hr=hrObj;
	$scope.minutes=minObj;
	$scope.shour=9;
	$scope.sMin=0;
	$scope.ehour=9;
	$scope.eMin=0;
	$scope.showeditform=function(aid){
		for(i=0;i<staffObj.staff.length;i++){
			var sid=staffObj.staff[i].id;
			$scope[sid]=false;
			for(j=0;j<staffObj.staff[i].appointments.length;j++){
				var id=staffObj.staff[i].appointments[j].aid;
				if(id==aid)
					$scope[aid]=!$scope[aid];
				else
					$scope[id]=false;
			}
		}
	};
	$scope.showaddform=function(sid){
		for(i=0;i<staffObj.staff.length;i++){
				var id=staffObj.staff[i].id;
				if(id==sid)
					$scope[sid]=!$scope[sid];
				else
					$scope[id]=false;
				for(j=0;j<staffObj.staff[i].appointments.length;j++){
					var aid=staffObj.staff[i].appointments[j].aid;
					$scope[aid]=false;
				}
		}
	};
	
}
);


/*get current date in mm/dd/yyyy format*/
function todayDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if(dd<10) {
		dd='0'+dd
	} 
	
	if(mm<10) {
		mm='0'+mm
	} 
	
	today = mm+'/'+dd+'/'+yyyy;
	return today;
}


/* get left index for showing green box on the timeline*/
function getLeftIndex(startTime){
	var sTime=startTime.split(":");
	if(sTime[1]=="undefined" || sTime[1]=="null" || sTime[1]==null || sTime[1]=="")sTime[1]=0;
	
	var index=Number(sTime[0])-9;
	var leftIndex=index*120;
	addindex=Number(sTime[1]);
	leftIndex= leftIndex+ (addindex*2);
	return leftIndex;
}

/*get the width of the green box to be shown on the timeline*/
function getAppointmentWidth(startTime,endTime)
{
	var sTime=startTime.split(":");
	var eTime=endTime.split(":");
	var diffHr=Number(eTime[0])-Number(sTime[0]);
	var aWidth=0;
	var diffMn=0;
	
	if(sTime[1]=="undefined" || sTime[1]=="null" || sTime[1]==null || sTime[1]=="")sTime[1]=0;
	if(eTime[1]=="undefined" || eTime[1]=="null" || eTime[1]==null || eTime[1]=="")eTime[1]=0;
	
	if(Number(eTime[1])<Number(sTime[1])){
		diffHr=diffHr-1;
		diffMn=(Number(eTime[1])+60)-Number(sTime[1]);
	}else{
		diffMn=Number(eTime[1])-Number(sTime[1]);
	}
	aWidth=((diffHr*60)+diffMn)*2;
	return aWidth;	
}


/*provided time get the hour*/
function gethr(time){
	var t=time.split(":");
	return Number(t[0]);
}

/*provided time get the minutes*/
function getMin(time){
	var t=time.split(":");
	if(t[1]=="undefined" || t[1]=="null" || t[1]==null || t[1]=="")t[1]=0;
	return Number(t[1]);
}

/*for adding the new appointment*/
app.controller("addForm",function($scope){
	$scope.addAppointment=function(){
		var length=staffObj.staff[$scope.$index].appointments.length;
		var index=$scope.$index;
		var st=$scope.shour+":"+$scope.sMin;
		var et=$scope.ehour+":"+$scope.eMin;
		var m=length;
		var newAppointment={};
		
		newAppointment.width=getAppointmentWidth(st,et);

		newAppointment.leftIndex=getLeftIndex(st);
		newAppointment.starttimehr=gethr(st);
		newAppointment.starttimemin=getMin(st);
				
		newAppointment.endtimehr=gethr(et);
		newAppointment.endtimemin=getMin(et);
		newAppointment.custname=$scope.name;
		newAppointment.custMob=$scope.mobileNumber;
		newAppointment.custEmail=$scope.email;
		newAppointment.aid="aass";		
		newAppointment.starttime=st;		
		newAppointment.endtime=et;	
		newAppointment.date="18-07-2015";			
		
		
		staffObj.staff[index].appointments.push(newAppointment);	
		
		$scope.$parent.y.push(newAppointment);		
	}
	
});

app.controller("editForm",function($scope){
	$scope.modifyAppointment=function(sIndex){
		var st=$scope.y.starttimehr+":"+$scope.y.startimemin;
		var et=$scope.y.endtimehr+":"+$scope.y.endtimemin;
		var aIndex=$scope.$index;
		
		staffObj.staff[sIndex].appointments[aIndex].width=getAppointmentWidth(st,et);		
		staffObj.staff[sIndex].appointments[aIndex].leftIndex=getLeftIndex(st);
		staffObj.staff[sIndex].appointments[aIndex].starttimehr=gethr(st);
		staffObj.staff[sIndex].appointments[aIndex].starttimemin=getMin(st);
				
		staffObj.staff[sIndex].appointments[aIndex].endtimehr=gethr(et);
		staffObj.staff[sIndex].appointments[aIndex].endtimemin=getMin(et);
		staffObj.staff[sIndex].appointments[aIndex].custname=$scope.y[aIndex].name;
		staffObj.staff[sIndex].appointments[aIndex].custMob=$scope.y[aIndex].mobileNumber;
		staffObj.staff[sIndex].appointments[aIndex].custEmail=$scope.y[aIndex].email;
		staffObj.staff[sIndex].appointments[aIndex].aid="aass";		
		staffObj.staff[sIndex].appointments[aIndex].starttime=st;		
		staffObj.staff[sIndex].appointments[aIndex].endtime=et;	
		staffObj.staff[sIndex].appointments[aIndex].date="18-07-2015";		
	}
	$scope.deleteAppointment=function(sIndex){
		var aIndex=$scope.$index;
		staffObj.staff[sIndex].appointments.splice(aIndex,1);
		$scope.$parent.y.splice(aIndex,1);	
	}
});

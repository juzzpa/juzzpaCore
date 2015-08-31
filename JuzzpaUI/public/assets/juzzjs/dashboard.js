var dashboardres="{'stores':[10,5,6,9,2,0,10,13,10,5,6,9],'appointments':[10,5,6,9,2,10,5,6,9,0,10,13],'staff':[10,5,6,9,2,10,5,6,9,0,10,13]}";
var dashboardobj=eval("("+dashboardres+")");
var stores=dashboardobj.stores;
var max_of_stores = Math.max.apply(Math, stores);
var appointments=dashboardobj.appointments;
var max_of_appointments = Math.max.apply(Math, appointments);
var staff=dashboardobj.staff;
var max_of_staff = Math.max.apply(Math, staff);

var storeData = {
labels : ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
datasets : [
	{
		fillColor : "rgba(151,187,205,0.5)",
		strokeColor : "rgba(151,187,205,1)",
		pointColor : "rgba(151,187,205,1)",
		pointStrokeColor : "#fff",
		data : stores.slice()
	}
]

};
	
	
var appointmentData = {
	labels : ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
	datasets : [
		{
			fillColor : "rgba(151,145,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : appointments.slice()
		}
	]

};

var staffData = {
	labels : ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
	datasets : [
		{
			fillColor : "rgba(256,145,205,90)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : appointments.slice()
		}
	]

};

new Chart(document.getElementById("stores").getContext("2d")).Line(storeData,{
	scaleOverride: true,scaleSteps: max_of_stores,scaleStepWidth: 1,animationEasing: "easeOutElastic",scaleFontFamily: "calibri"
});


new Chart(document.getElementById("appointments").getContext("2d")).Line(appointmentData,{
	scaleOverride: true,scaleSteps: max_of_appointments,scaleStepWidth: 1,animationEasing: "easeInOutBack",scaleFontFamily: "calibri"
});


new Chart(document.getElementById("staff").getContext("2d")).Line(staffData,{
	scaleOverride: true,scaleSteps: max_of_staff,scaleStepWidth: 1,animationEasing: "easeInBounce",scaleFontFamily: "calibri"
});



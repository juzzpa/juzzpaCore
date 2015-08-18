//Manage services

var services="{'services':[{'name':'serviceA'},{'name':'serviceB'},{'name':'serviceC'},{'name':'serviceD'}]}";
var addedServices="{'ase':[{'name':'sa'},{'name':'sb'}]}";
var regResponse="{'status':'200','userId':'1'}";
var viewService="{'service':[{'servicename':'serviceA','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'1'},{'servicename':'serviceB','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'3'},{'servicename':'serviceC','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'3'},{'servicename':'serviceD','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'4'}]}"

$(document).ready(function() {
	var i;
	
	//populate the master list of services
	var serviceList=eval("("+services+")");
	for(i=0;i<serviceList.services.length;i++){
		var name=serviceList.services[i].name;
		$("#masterService").append("<option value='"+name+"'>"+name+"</option>");
	}
	
	
	//check whether there is atleast one service is added
	var addedServiceList=eval("("+addedServices+")");
	if(addedServiceList.ase.length>1){
		$("#servicespan").text("Add more");
		$("#next").removeAttr("disabled");
	}
	
	//load the added services initially	
	var viewServiceList=eval("("+viewService+")");
	for(i=0;i<viewServiceList.service.length;i++){
		var serviceImg=viewServiceList.service[i].serviceimg;
		var serviceName=viewServiceList.service[i].servicename;
		var serviceDesc=viewServiceList.service[i].serviceDesc;
		var serviceId=viewServiceList.service[i].serviceId;
		
		var newService="<div id='"+serviceId+"' class='col-sm-3 centered' style='border:1px solid white;height:280px;width:200px;margin:5px;'>";
		newService+="<img id='serviceImg' src='"+serviceImg+"' class='img-circle margin10' width='100' height='100'/><br>";
		newService+="<div style='overflow:auto;height:120px;'>";
		newService+="<p id='serviceName' class='font-champagne font-medium centered'>"+serviceName+"</p>";
		newService+="<p id='serviceDesc' class='font-champagne'>"+serviceDesc+"</p>";
		newService+="</div>";
		newService+="<button type='button' style='position:absolute;width:50%;left:0;bottom:0' class='juzz-button juzz-default font-champagne'>Modify</button>";
		newService+="<button id='delete' type='button' style='position:absolute;width:50%;right:0;bottom:0' class='juzz-button juzz-theme1 font-champagne'>Delete</button>";
		newService+="</div>";
				
		$("#row").append(newService);
	}
	
	
	//action when the services are added initially
	$("#initialService").click(
		function(){
			$("#serviceSuccess").remove();
			$("#minService").remove();
			
			var result=eval("("+regResponse+")");
			if(result.status==200){
				$("#masterService").before("<p id='serviceSuccess' class='font-champagne centered'>"+serviceSuccess+"</p>");
			}
		}
	);
	
	//clicking on the next button for completing other steps of the profile process	
	$("#next").click(
		function(){
			if(addedServiceList.ase.length>=1){
				window.location.href="Set_initial_staff.html";
			}else{
				$("#serviceSuccess").remove();
				$("#minService").remove();
				$("#masterService").before("<p id='minService' class='font-champagne centered'>"+minService+"</p>");
			}
		}
	);
	
	//toggle of add form when clicked on plus sign
	$("#plus").click(
		function(){
			if($("#add").is(":visible")){
				$("#add").fadeOut(500,function(){$("#main").css("margin-left","0px");});				
			}else{
				$("#add").fadeIn(500);
				$("#main").css("margin-left","300px");
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
	
	
	//for adding services when the click happens through ajax
	$("#addService").click(
		function(){			
			var result=eval("("+regResponse+")");
			if(result.status==200){
				var serviceImg="assets/img/b1.png";
				var serviceName=$("#masterService").val();
				
				var newService="<div data-id='2' class='col-sm-3 centered' style='border:1px solid white;height:280px;width:200px;margin:5px;'>";
                newService+="<img id='serviceImg' src='"+serviceImg+"' class='img-circle margin10' width='100' height='100'/><br>";
                newService+="<div style='overflow:auto;height:120px;'>";
                newService+="<p id='serviceName' class='font-champagne font-medium centered'>"+serviceName+"</p>";
                newService+="<p id='serviceDesc' class='font-champagne'>Enjoy the servie like nature comes and gives you bloody hell of a massage. and dont forget to click on the subscriber button below;)</p>";
                newService+="</div>";
                newService+="<button type='button' style='position:absolute;width:50%;left:0;bottom:0' class='juzz-button juzz-default font-champagne'>Modify</button>";
                newService+="<button id='delete' type='button' style='position:absolute;width:50%;right:0;bottom:0' class='juzz-button juzz-theme1 font-champagne'>Delete</button>";
            	newService+="</div>";
								
				$("#row").append(newService);
			}
		}
	);
	
	
	//for performing delete operation
	$(document).on("click","#delete",function(){
		$(this).parent().remove();
	});	
	
	
});
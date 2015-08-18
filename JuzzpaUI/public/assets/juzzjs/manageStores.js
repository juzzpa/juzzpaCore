//Manage stores

var stores="{'stores':[{'name':'storeA'},{'name':'storeB'},{'name':'storeC'},{'name':'storeD'}]}";
var addedServices="{'ase':[{'name':'sa'},{'name':'sb'}]}";
var addedStaff="{'asf':[{'name':'sfa'},{'name':'sfb'}]}";
var regResponse="{'status':'200','userId':'1'}";
var viewService="{'service':[{'servicename':'serviceA','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'1'},{'servicename':'serviceB','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'3'},{'servicename':'serviceC','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'3'},{'servicename':'serviceD','serviceimg':'assets/img/b1.png','serviceDesc':'enjoy the massage','serviceId':'4'}]}"

$(document).ready(function() {
	var i;
	
	var storeList=eval("("+stores+")");	
	for(i=0;i<storeList.stores.length;i++){
		var name=storeList.stores[i].name;
		$("#addedStores").append("<option value='"+name+"'>"+name+"</option>");
	}
	
	if(storeList.stores.length>1){
		$("#storespan").text("Add more");
		$("#next").removeAttr("disabled");
	}
	
	var addedServiceList=eval("("+addedServices+")");	
	for(i=0;i<addedServiceList.ase.length;i++){
		var name=addedServiceList.ase[i].name;
		$("#addedServices").append("<option value='"+name+"'>"+name+"</option>");
	}
	
	var addedStaffList=eval("("+addedStaff+")");	
	for(i=0;i<addedStaffList.asf.length;i++){
		var name=addedStaffList.asf[i].name;
		$("#addedStaff").append("<option value='"+name+"'>"+name+"</option>");
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
		
	$("#initialStore").click(
		function(){
			$("#storeSuccess").remove();
			$("#minStore").remove();
			
			var result=eval("("+regResponse+")");
			if(result.status==200){
				$("#addedStores").before("<p id='storeSuccess' class='font-champagne centered'>"+storeSuccess+"</p>");
			}
		}
	);
	
	$("#addStore").click(
		function(){
			$("#storeSuccess").remove();
			$("#minStore").remove();
			
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
	
	$("#next").click(
		function(){
			if(storeList.stores.length>=1){
				window.location.href="Dashboard.html";
			}else{
				$("#storeSuccess").remove();
				$("#minStore").remove();
				$("#addedStores").before("<p id='minStore' class='font-champagne centered'>"+minStore+"</p>");
			}
		}
	);
	
	//for performing delete operation
	$(document).on("click","#delete",function(){
		$(this).parent().remove();
	});	
	
});
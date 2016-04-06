//global variables
var map;
var directionsRender;
var currentSelectedPathType;			//current selected path 1 is first 2 is second
var currentSelectedMarkerType;			//current selected point marker 1 is start 2 is end
var SameLastLats = new Array();
var SameLastLngs = new Array();
var SameLastStop = new Array();
var routePath = new Array();
var num = 0;

function Initialize() {
    directionsRender = new google.maps.DirectionsRenderer();

    //set map options
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(25.046493,121.5150751)
    };

    //set map
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    //directions set map
    directionsRender.setMap(map);

    //click set marker event
    google.maps.event.addListener(map, 'click', function(event) {
        SetMarkerForMap(event.latLng);
    });

    //set height
    $("#panel-block").height($('body').height());
    $("#map-block").height($('body').height());
    $("#output").height($('body').height());
}

//page load event
google.maps.event.addDomListener(window, 'load', Initialize);

function CalcTwoRoute() {
	// if (firstPathStartPointMarker != null && firstPathEndPointMarker != null)
			
				
                SetMarkerStatus(1,1);
				SetMarkerStatus(1,2);
                
                for(var i = 0 ; i < 1 ; i++){
                randomPoint(i);
                GetPath(firstPathStartPointLat, firstPathStartPointLng, firstPathEndPointLat, firstPathEndPointLng);

             
                }
}

//第一條路全域變數
var firstPathDirectionRender = null;
var firstPathDirectionsService = new google.maps.DirectionsService();
var firstPathRectangle = null; 			//bounds 範圍
var firstPathStartPoint = null; 		//起點
var firstPathEndPoint = null; 			//終點
var firstPathStartPointMarker = null; 	//起點標誌
var firstPathEndPointMarker = null; 	//終點標誌
var firstPathPolylineOptions = {		//第一條路徑的顯示選項
	strokeColor: '#0090ff',
	strokeOpacity: 0.5,
	strokeWeight: 8
};
var firstPathLats = new Array();		//第一條路徑緯度陣列
var firstPathLngs = new Array();		//第一條路徑經度陣列
var firstPathDots = new Array();		//第一條路徑所有點集合
var firstPathStartPointLat;
var firstPathStartPointLng;
var firstPathEndPointLat;
var firstPathEndPointLng;

var StartPointLat;
var StartPointLng;
var EndPointLat;
var EndPointLng;

var SameLats = new Array();
var SameLngs = new Array();
var SameStop = new Array();

var StopData1 = new Array() ;
var StopData2 = new Array();
var smallDistance = 0.0001;
var a1;
var a2;
var timeHour = 0;
var timeSecond = 0;
var tempHour = 0;
var tempSecond = 0;
var maxNum = 28170;  
var minNum = 0;  

var directionsService = new google.maps.DirectionsService();
var abc=0;
var stop;


function GetDistance(lat1,lon1,lat2,lon2) {
 var R = 6371; // km (change this constant to get miles)
 var dLat = (lat2-lat1) * Math.PI / 180;
 var dLon = (lon2-lon1) * Math.PI / 180;
 var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 var d = R * c;
 if (d>1) return Math.round(d)+"km";
 else if (d<=1) return Math.round(d*1000)+"m";
 return d;
}

function GetPath(firstPathStartPointLat, firstPathStartPointLng, firstPathEndPointLat, firstPathEndPointLng) {
    
    var PathStartPoint = new google.maps.LatLng(firstPathStartPointLat, firstPathStartPointLng);
    var PathEndPoint = new google.maps.LatLng(firstPathEndPointLat, firstPathEndPointLng);

    //first path direction render request
    var PathRequest = {
        origin: PathStartPoint,
        destination: PathEndPoint,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        
    };

    var PathDirectionsService = new google.maps.DirectionsService();
    //get first path request
    PathDirectionsService.route(PathRequest, function(Response, Status) {
        if (Status == google.maps.DirectionsStatus.OK) {
            //clear selected point icon
            // firstPathStartPointMarker.setMap(null);
            // firstPathEndPointMarker.setMap(null);

            //set first path polyline
            var PathDirectionRender = new google.maps.DirectionsRenderer({
                polylineOptions: firstPathPolylineOptions
            });

            //set first path display on map
            PathDirectionRender.setMap(map);
            PathDirectionRender.setDirections(Response);
           
    
            //get first path points display on screen
            OutputPathPoints(1, Response);

            //set first path rectangle display on map by google map api rectangle
            //GetFirstPathRectangle();
        }
    });
}

//第一條路顯示
function GetFirstPath() {
    //if first path has existed, then reset it on map
    if (firstPathDirectionRender != null) {
        firstPathDirectionRender.setMap(null);
        firstPathRectangle.setMap(null);
        firstPathLats.length = 0;
        firstPathLngs.length = 0;
    }

	var firstPathStartPoint = new google.maps.LatLng(firstPathStartPointLat, firstPathStartPointLng);
    var firstPathEndPoint = new google.maps.LatLng(firstPathEndPointLat, firstPathEndPointLng);

    //first path direction render request
    var firstPathRequest = {
        origin: firstPathStartPoint,
        destination: firstPathEndPoint,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        optimizeWaypoints: true
        
  		
    };

    //get first path request
    firstPathDirectionsService.route(firstPathRequest, function(firstResponse, firstStatus) {
        if (firstStatus == google.maps.DirectionsStatus.OK) {
            //clear selected point icon
            // firstPathStartPointMarker.setMap(null);
            // firstPathEndPointMarker.setMap(null);

            //set first path polyline
            firstPathDirectionRender = new google.maps.DirectionsRenderer({
            	polylineOptions: firstPathPolylineOptions
            });

            //set first path display on map
            firstPathDirectionRender.setMap(map);
            firstPathDirectionRender.setDirections(firstResponse);
           
 	
            //get first path points display on screen
            OutputPathPoints(1, firstResponse);


            //set first path rectangle display on map by google map api rectangle
            //GetFirstPathRectangle();
        }
    });
}

var xmlhttp;
function LoadXMLAndCalc(){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=state_Change;
    xmlhttp.open('GET', 'busroadistop.xml', true);
    xmlhttp.send();
}

function randomPoint(num){
    var num1,num2;

     /*
               隨機取點
               */ 
               
               num1 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
               num2 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
               timeHour = Math.floor(Math.random() * (23 - 00 + 1)) + 00;
               timeSecond = Math.floor(Math.random() * (59 - 00 + 1)) + 00;
               //num1 = 19436;
               //num2 = 9141;

                while(num1 == num2)
                {
                    num2 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
                }

                StopData1[num] = Stops[num1].attributes;
                //alert(StopData1.getNamedItem("nameZh").value + "\n"  + StopData1.getNamedItem("latitude").value  + "\n" + StopData1.getNamedItem("longitude").value + " @ " +num1);   
                
                firstPathStartPointLng =  StopData1[num].getNamedItem("longitude").value;
                firstPathStartPointLat =  StopData1[num].getNamedItem("latitude").value;

                StopData2[num]  = Stops[num2].attributes;
                //alert(StopData2.getNamedItem("nameZh").value + "\n"  + StopData2.getNamedItem("latitude").value + "\n" + StopData2.getNamedItem("longitude").value  + " @ " + num2 ); 
                

                firstPathEndPointLng =  StopData2[num].getNamedItem("longitude").value;
                firstPathEndPointLat =  StopData2[num].getNamedItem("latitude").value;
          
                //}
                //第一步：做你想要做的運算。
                //第二步：載入你創立的PANEL。

}

function state_Change(){
	//var num1,num2;
	
	
	if (xmlhttp.readyState==4){
		// 4 = "loaded"
		if (xmlhttp.status==200){
			// 200 = OK
			// ...our code here...
			//xmlData就是你的站牌XML資料。
		    var xmlData = xmlhttp.responseXML;
		    if(xmlData!=null){
		    	//取得所有站牌資料，他是一個陣列。
			    Stops = xmlData.getElementsByTagName("Stop");
			    //for (i = 0; i < Stops.length; i++) {
			    //取得第1筆站牌資料
			     
		    }
		} else { 
			alert("Problem retrieving XML data");
		}
	}
}

//add marker info on map
//pointType:
//1 is start point
//2 is end point
function SetMarkerInfo(PointType, latLng) {
	switch (PointType) {
		case 1:
			switch	(currentSelectedPathType) {
				case 1:
					firstPathStartPoint = latLng;
					break;
				case 2:
					secondPathStartPoint = latLng;
					break;
			}
			break;
		case 2:
			switch (currentSelectedPathType) {
				case 1:
					firstPathEndPoint = latLng;
					break;
				case 2:
					secondPathEndPoint = latLng;
					break;
			}
			break;
	}
}

//output display path 
function OutputPathPoints(pathType, response) {
	var path = GetPathPoints(response, pathType);
	var output = null;
	var output_body = null;
	var k = 0;

	//select output which path
	switch (pathType) {
		case 1:
			output = $('#output1');
			output_body = $('#output1 .panel-body');
			break;
		case 2:
			output = $('#output2');
			output_body = $('#output2 .panel-body');
			break;
	}

	output_body.html("");
	$("#map-block").removeClass("col-md-9");
    $("#map-block").addClass("col-md-5");
    output.show();

    //clear previous points
    SetPathClear(pathType);


	if (xmlhttp.readyState==4){
		// 4 = "loaded"
		if (xmlhttp.status==200){
			// 200 = OK
			// ...our code here...
			//xmlData就是你的站牌XML資料。
		    var xmlData = xmlhttp.responseXML;
		    if(xmlData!=null)
		    	//取得所有站牌資料，他是一個陣列。
			    var Stops = xmlData.getElementsByTagName("Stop");
			   
				//output_body.append(StopData.getNamedItem("nameZh").value + "\n"  + StopData.getNamedItem("latitude").value  + "\n" + StopData.getNamedItem("longitude").value);
				// output_body.append("起點:" + Stops[11].attributes.getNamedItem("latitude").value + "," + Stops[11].attributes.getNamedItem("longitude").value  + "<br/><br/><br/>");
	}
		}
    
    
    //比對
    for (var i = 0; i < path.length; i++) {
    	if (i > 0 && i < path.length - 1)
    		//SetPathMarkerDot(pathType, i-1, path[i]);
    		
    		for(var j = 0; j < Stops.length; j++){
    			if(Math.abs(path[i].lat() - Stops[j].attributes.getNamedItem("latitude").value) < smallDistance && Math.abs(path[i].lng() - Stops[j].attributes.getNamedItem("longitude").value) < smallDistance){
    		
    		   	//output_body.append(Stops[j].attributes.getNamedItem("nameZh").value + " " + Stops[j].attributes.getNamedItem("latitude").value + ", " + Stops[j].attributes.getNamedItem("longitude").value + "<br/>");

    		 	SameLats[k] = Stops[j].attributes.getNamedItem("latitude").value;
    		 	SameLngs[k] = Stops[j].attributes.getNamedItem("longitude").value;
    		 	SameStop[k] = Stops[j].attributes.getNamedItem("nameZh").value;
    		 	k++;
 		
    		break;
    		
    		}

     	}
  
    }
    
    var l = 0
    var tempStartPointLat;
    var tempStartPointLng;
    var tempEndPointLat;
    var tempEndPointLng;
    var tempPoint = new google.maps.LatLng(SameLats[0], SameLngs[0]);
    var flag = 0;
    var number = 0;

    var requestArray = [];
	var cur = 0;
	var tempNumber = 0;

      for(var k =1; k < SameLats.length ; k ++)
     {
   	
     	if(SameStop[k] == SameStop[k-1]){
    		k++;
    	}
 	
     	else{
  		    		
     		if(k > 0){
  		  	SameLastStop[l] = SameStop[k];
     		SameLastLats[l] = SameLats[k];
			SameLastLngs[l] = SameLngs[k];
     		    		
    		l++

     	 	}

     	 }
     }

SameLastStop.push(StopData2[num].getNamedItem("nameZh").value);
SameLastLats.push(StopData2[num].getNamedItem("latitude").value);
SameLastLngs.push(StopData2[num].getNamedItem("longitude").value);

output_body.append( StopData1[num].getNamedItem("nameZh").value + "<br/>"  + StopData1[num].getNamedItem("latitude").value  + " " + StopData1[num].getNamedItem("longitude").value+ "<br/>" + "發車" +timeHour +" : " +　timeSecond+ "<br/>" );
    

  for(var l =0; l < SameLastLats.length ; l ++){
                                tempStartPointLat = SameLastLats[l-1];
                                tempStartPointLng = SameLastLngs[l -1];
                                tempEndPointLat = SameLastLats[l];
                                tempEndPointLng = SameLastLngs[l];

                                var tempStartPoint = new google.maps.LatLng(tempStartPointLat, tempStartPointLng);
                                var tempEndPoint = new google.maps.LatLng(tempEndPointLat, tempEndPointLng);

                                var request = {
                                     // 起點
                                    origin: tempStartPoint,
                                     // 終點 
                                    destination: tempEndPoint,
                                    waypoints: [],
                                    // 路線最佳化
                                    optimizeWaypoints: true,
                                    // 交通模式，目前有 開車/步行 以及腳踏車(僅限美國) 三種路線規劃    
                                    //TravelMode.DRIVING：開車
                                    //TravelMode.WALKING：步行
                                    //TravelMode.BICYCLING 腳踏車
                                    travelMode: google.maps.TravelMode.DRIVING,
                                    unitSystem: google.maps.UnitSystem.METRIC
                                    };

                                    requestArray.push(request);
}

if(requestArray.length > 0){
     directionsService.route(requestArray[cur], directionResults);
}

function directionResults(result, status) {

   if (status == google.maps.DirectionsStatus.OK) {
                                 var route = result.routes[0];

                                timeSecond =　timeSecond + parseInt(route.legs[0].duration.text, 10);   
                                                                
                                if(timeSecond > 59){
                                	tempHour = timeSecond / 60;
                                	timeSecond = timeSecond % 60;
                                }

                                timeHour = timeHour + tempHour;

                                output_body.append("相距" + route.legs[0].distance.text + ', ' +  route.legs[0].duration.text +  "<br/>" );
 								output_body.append(SameLastStop[cur]+ "<br/>" + SameLastLats[cur] + " " + SameLastLngs[cur]  +  " "+"<br/>");
 								output_body.append("抵達時間" + Math.floor(timeHour) +" : " +　timeSecond + "<br/>" );
								MarkPoint(SameLastStop[cur],SameLastLats[cur],SameLastLngs[cur]);
                                tempHour  = 0;
   }
   cur++;
   if(cur < requestArray.length){
      directionsService.route(requestArray[cur], directionResults);
   }
}
    //show download path data panel
    $('#download-btn').show();
     downloadRoute(1);

}
    SameLastStop.length = 0;
    SameStop.length = 0;
    SameLastLats.length = 0;
    SameLats.length = 0;
    SameLastLngs.length = 0; 
    SameLngs.length = 0;

//得出路線上的 點
//get path legs steps points
//r is response
//p is which path
function GetPathPoints(r, p) {

	//block variable for path
	var bkPath = new Array();

	//p path steps array
	var steps = r.routes[0].legs[0].steps;

	//how many points in steps
	var stepsPointsCount = 0;

	//set points to bkPath
	for (var i = 0; i < steps.length; i++) {
		//path in one step which stored that step all points
		var SPPath = steps[i].path;

		for (var j = 0; j < SPPath.length; j++) {
			if (p == 1) {

				firstPathLats[stepsPointsCount] = SPPath[j].lat();
				firstPathLngs[stepsPointsCount] = SPPath[j].lng();

			} else if (p == 2) {
				secondPathLats[stepsPointsCount] = SPPath[j].k;
				secondPathLngs[stepsPointsCount] = SPPath[j].D;
			}

			bkPath[stepsPointsCount++] = SPPath[j];
		}
	}

	return bkPath;
}

//清除路徑的點集合
function SetPathClear(pathType) {
	switch (pathType) {
		case 1:
			for (var i = 0; i < firstPathDots.length; i++)
				firstPathDots[i].setMap(null);
			break;
		case 2:
			for (var i = 0; i < secondPathDots.length; i++)
				secondPathDots[i].setMap(null);
			break;
	}
}

 function MarkPoint(numStop,numlat,numlng){
 	var myLatlng = new google.maps.LatLng(numlat,numlng);
 	var marker = new google.maps.Marker({

    	 	position: myLatlng,    //Marker的座標
     	map: map,    //map物件，以這篇文章的例子，就是上面那個map物件
     	icon : "img/path_dot.png",
     	title: numStop    //當滑鼠移至Marker上時，要顯示的Title文字
 	});

 		google.maps.event.addListener(marker, 'click', function() {
    			 infowindow.open(map, marker);
 		});
}	
 

//設定路徑的點標誌
function SetPathMarkerDot(pathType, index, latLng) {
	var marker = null;
	//set selected path waypoint
	switch (pathType) {
		case 1:
			firstPathDots[index] = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: "img/path_dot.png",
				title: latLng.lat() + ", " + latLng.lng()
			});
			marker = firstPathDots[index];
			break;
		case 2:
			secondPathDots[index] = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: "img/path_dot_2.png",
				title: latLng.k + ", " + latLng.D
			});
			marker = secondPathDots[index];
			break;
	}

	google.maps.event.addListener(marker, 'click', function() {
		new google.maps.InfoWindow({
			content: '<div>' + latLng.lat() + ", " + latLng.lng() + '</div>'
		}).open(map, marker);
	});
}

//set marker info to map
function SetMarkerForMap(latLng) {
	var startMarker = null;
	var endMarker = null;

	//icon for marker
	var startMarkerIcon = null;
	var endMarkerIcon = null;

	//set current selected path maker
	switch (currentSelectedPathType) {
		case 1:
			startMarker = firstPathStartPointMarker;
			endMarker = firstPathEndPointMarker;
			startMarkerIcon = "img/p1_start_pin.png";
			endMarkerIcon = "img/p1_end_pin.png";
			break;
		case 2:
			startMarker = secondPathStartPointMarker;
			endMarker = secondPathEndPointMarker;
			startMarkerIcon = "img/p2_start_pin.png";
			endMarkerIcon = "img/p2_end_pin.png";
			break;
	}

	//set current selected path point marker
	switch (currentSelectedMarkerType) {
		case 1:
			if (startMarker != null)
				startMarker.setMap(null);

			startMarker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: startMarkerIcon,
				title: 'Start Point'
			});

			//set marker info to selected marker
			SetMarkerInfo(1, latLng);

			//set marker status
			SetMarkerStatus(currentSelectedPathType, 0);
			break;
		case 2:
			if (endMarker != null)
				endMarker.setMap(null);

			endMarker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: endMarkerIcon,
				title: 'End Point'
			});

			//set marker info to selected marker
			SetMarkerInfo(2, latLng);

			//set marker status
			SetMarkerStatus(currentSelectedPathType, 0);
			break;
	}

	//store select condition to variable
	switch (currentSelectedPathType) {
		case 1:
			firstPathStartPointMarker = startMarker;
			firstPathEndPointMarker = endMarker;
			break;
		case 2:
			secondPathStartPointMarker = startMarker;
			secondPathEndPointMarker = endMarker;
			break;
	}
}

//set marker status
function SetMarkerStatus(pathType, pointType) {
	switch (pointType) {
		case 1: //start point
			currentSelectedMarkerType = 1;
			$("#point-" + pathType + "-start").addClass("panel-selected");
            $("#point-" + pathType + "-end").removeClass("panel-selected");
            break;
        case 2: //end point
            currentSelectedMarkerType = 2;
            $("#point-" + pathType + "-end").addClass("panel-selected");
            $("#point-" + pathType + "-start").removeClass("panel-selected");
            break;
        case 0:
            currentSelectedMarkerType = 0;
            $("#point-" + pathType + "-start").removeClass("panel-selected");
            $("#point-" + pathType + "-end").removeClass("panel-selected");
            break;
	}
	currentSelectedPathType = pathType;
}

//download path data
//下載路徑資料
function downloadRoute(point) {
    switch (point) {
        case 1:
            $("#data").val($("#output1 .panel-body").html());
            break;
        case 2:
            $("#data").val($("#output2 .panel-body").html());
            break;
    }
    $("#output-data").submit();
}


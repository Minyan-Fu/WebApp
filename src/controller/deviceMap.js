angular.module('saveBotton', ['ngMaterial'])
.controller('SaveCtrl', function($scope,$http,$filter) {
	$scope.show=function(){
		var DeviceId=localStorage.getItem("nowId");
		var UserId=localStorage.getItem("userId");

		startTime1=localStorage.getItem("starttime");
		endTime1=localStorage.getItem("endtime");
		console.log(DeviceId,UserId);
		console.log(startTime1,endTime1);
		startTime=$filter("date")(startTime1, "yyyy-MM-dd HH:mm:ss");
		endTime=$filter("date")(endTime1, "yyyy-MM-dd HH:mm:ss");
		console.log(DeviceId,UserId,startTime,endTime);
		var getData = "?startTime="+startTime+"&"+"endTime="+endTime+"&deviceId="+DeviceId;
      	var url = "http://192.168.137.1:8080/DBCon/showRoutineServlet" + getData;
     	 $http.get(url).then(function success(response){
		console.log(response.data);
		if(response.data==""){
			localStorage.setItem('coordinates',null);
		}else{
		var string=response.data.replace("[","").replace("]","");
		var array=string.split(",");
		console.log(array);
		var array3=[];
		for (var i = 0; i<array.length;i=i+1){
    	var string2=array[i].toString();
		var array2=string2.replace(" Point:POINT(","").replace("Point:POINT(","").replace(")","").split(" ");
		array3.push(array2);
		localStorage.setItem('coordinates',JSON.stringify(array3));
		}
		console.log(array3);
	}
      },function error(response){
		console.log("error");
		localStorage.setItem('coordinates',JSON.stringify([]));
	  });
	};

	$scope.save=function(){
		var DeviceId=localStorage.getItem("nowId");
		var UserId=localStorage.getItem("userId");
		startTime1=localStorage.getItem("starttime");
		endTime1=localStorage.getItem("endtime");
		startTime=$filter("date")(startTime1, "yyyy-MM-dd HH:mm:ss");
		endTime=$filter("date")(endTime1, "yyyy-MM-dd HH:mm:ss");
		var routineName=localStorage.getItem("routineName");
		if (routineName==null){
			routineName="routine of device id:"+DeviceId;
		}
		var getData = "?deviceId="+DeviceId+"&"+"userId="+UserId+"&"+"startTime="+startTime+"&"+"endTime="+endTime
		+"&"+"routineName="+routineName;
      	var url = "http://192.168.137.1:8080/DBCon/addRoutinesServlet" + getData;
     	 $http.get(url).then(function success(response){
		console.log(response.data);
		});
	};

})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});

mapboxgl.accessToken = 'pk.eyJ1IjoibWlueWFuZnUiLCJhIjoiY2s3MHF6bGx1MDAwODNsdWc4NWpwOGk3ZiJ9.-JNfNcvmZrtGg7MWh0F4fw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-122.486052, 37.830348],
zoom: 15
});
map.on('load', function() {
	var read=JSON.parse(localStorage.getItem('coordinates'));
	console.log(read);

	map.flyTo({
		center: read[0],
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
	});
map.addSource('route', {
'type': 'geojson',
'data': {
'type': 'Feature',
'properties': {},
'geometry': {
'type': 'LineString',
'coordinates': read
},
}
});
map.addLayer({
'id': 'route',
'type': 'line',
'source': 'route',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#888',
'line-width': 8
}
});
});


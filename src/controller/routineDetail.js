angular.module('showBotton', ['ngMaterial'])
.controller('SaveCtrl', function($scope,$http,$filter,$window) {
	
	$scope.show=function(){
		var routineId=localStorage.getItem("routineId");
		var UserId=localStorage.getItem("userId");
		var deviceId=localStorage.getItem("nowId");

		var getData = "?routineId="+routineId;
      	var url = "http://192.168.137.1:8080/DBCon/chooseTimeServlet" + getData;
     	$http.get(url).then(function success(response){
			console.log(response.data);		
			 var string=response.data.replace("[{startTime:","").replace("}]","").replace(" endTime:","");
			 var array=string.split(",");
			 console.log(array);
			 startTime1=array[0];
			 endTime1=array[1];
			 startTime=$filter("date")(startTime1, "yyyy-MM-dd HH:mm:ss");
			 endTime=$filter("date")(endTime1, "yyyy-MM-dd HH:mm:ss");

		var getData = "?startTime="+startTime+"&"+"endTime="+endTime+"&deviceId="+deviceId;
      	var url = "http://192.168.137.1:8080/DBCon/showRoutineServlet" + getData;
     	 $http.get(url).then(function success(response){
		console.log(response.data);
		
		var string=response.data.replace("[","").replace("]","");
		var array=string.split(",");
		console.log(array);
		var array3=[];
		for (var i = 0; i<array.length;i=i+1){
    	var string2=array[i].toString();
		var array2=string2.replace(" Point:POINT(","").replace("Point:POINT(","").replace(")","").split(" ");
		console.log(array2);
		array3.push(array2);
		localStorage.setItem('coordinates',JSON.stringify(array3));
		}

		
		},function error(response){
        console.log("error");
		});
	});
	$window.location.reload();
};




	
mapboxgl.accessToken = 'pk.eyJ1IjoibWlueWFuZnUiLCJhIjoiY2s3MHF6bGx1MDAwODNsdWc4NWpwOGk3ZiJ9.-JNfNcvmZrtGg7MWh0F4fw';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-122.486052, 37.830348],
	zoom: 15
});

map.on('load', function () {
	
	var read=JSON.parse(localStorage.getItem('coordinates'));
	console.log(read);
	map.addSource('route', {
		'type': 'geojson',
		'data': {
			'type': 'Feature',
			'properties': {},
			'geometry': {
				'type': 'LineString',
				'coordinates': read
			}
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

	$scope.add=function(){
	var marker = new mapboxgl.Marker({
		draggable: true
	})
	.setLngLat([-122.486052, 37.830348])
	.addTo(map);
 
	function onDragEnd() {
		var lngLat = marker.getLngLat();
		Longitude=lngLat.lng;
		Latitude=lngLat.lat;
	}
 
	marker.on('dragend', onDragEnd);
	};
	
});
})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
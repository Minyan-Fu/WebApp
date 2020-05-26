angular.module('homeButtons', ['ngMaterial'])
.controller('AppCtrl', function($scope,$http,$filter) {
	var url = 'https://wanderdrone.appspot.com/';
	var request = new XMLHttpRequest();
	var arraypoint=[];
	var arraytimestamp=[];

	$scope.start=function(){
	let intervalId = window.setInterval(function() {
	// make a GET request to parse the GeoJSON at the url
	request.open('GET', url, true);
	request.onload = function() {
	if (this.status >= 200 && this.status < 400) {
	// retrieve the JSON from the response
	var json = JSON.parse(this.response);
	var timestamp = (new Date()).valueOf();
	arraypoint.push(json.geometry.coordinates);
	arraytimestamp.push(timestamp);
	console.log(arraypoint,arraytimestamp);
	}
	};
	request.send();
	}, 2000);  

	$scope.end=function(){
		window.clearInterval(intervalId);
		console.log(arraypoint,arraytimestamp);
		for(var i=0;i<arraypoint.length;i++){
			var deviceId=localStorage.getItem("nowId");
	    	console.log(deviceId);
			geturl=null;
			timestamp=$filter("date")(arraytimestamp[i], "yyyy-MM-dd HH:mm:ss");
			geturl="?timestamp="+timestamp+"&point=POINT("+arraypoint[i]+")&deviceId="+deviceId;
			console.log(geturl);
			var url = "http://192.168.137.1:8080/DBCon/addRecordServlet" + geturl;
			console.log(url);
			$http.get(url).then(function success(response){
        	console.log(response.data);
        	if(response.data=="insert successfully"){
				console.log("insert a new record.");
        	}
       	 	else{
          		console.log("try again");
       		 }
      		},function error(response){
        	console.log("error");
     		 });
		}
		

	};
	};

	mapboxgl.accessToken = 'pk.eyJ1IjoibWlueWFuZnUiLCJhIjoiY2s3MHF6bGx1MDAwODNsdWc4NWpwOGk3ZiJ9.-JNfNcvmZrtGg7MWh0F4fw';
		var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		zoom: 0
		});
 
var url = 'https://wanderdrone.appspot.com/';
map.on('load', function() {	
var request = new XMLHttpRequest();
window.setInterval(function() {
// make a GET request to parse the GeoJSON at the url
request.open('GET', url, true);
request.onload = function() {
if (this.status >= 200 && this.status < 400) {
// retrieve the JSON from the response
var json = JSON.parse(this.response);
 
// update the drone symbol's location on the map
map.getSource('drone').setData(json);
 
// fly the map to the drone's current location
map.flyTo({
center: json.geometry.coordinates,
speed: 0.5
});
}
};
request.send();
}, 2000);
 
map.addSource('drone', { type: 'geojson', data: url });
map.addLayer({
'id': 'drone',
'type': 'symbol',
'source': 'drone',
'layout': {
'icon-image': 'rocket-15'
}
});
});

});



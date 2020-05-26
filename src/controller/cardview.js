angular.module('DeviceCards', ['ngMaterial'])

.controller('DeviceCardsCtrl', function($scope,$http) {
  
  $scope.names=[];

  $scope.show=function(){
    console.log("get","running3");
    var getData="?userId="+localStorage.getItem("userId");
    var url = "http://192.168.137.1:8080/DBCon/DeviceServlet" + getData;
     console.log(url);
    $http.get(url).then(function success(response){
    console.log(response.data);
    var string=response.data.replace("[","").replace("]","");
    var array=string.split("},");
    for (var i = 0; i<array.length;i=i+1){
    var string2=array[i].toString();
    var array2=string2.replace("{","").replace(" ","").replace(" ","")
    .replace("}","").replace("DeviceId:","").replace("DeviceName:","").split(",");
    console.log(array2[0]);
    console.log(array2[1]);
    $scope.names.push({DeviceName:array2[0],DeviceId:array2[1]});
    }
    },function error(response){
        console.log("error");
    });
  };

  $scope.chooseTime=function(x){
    localStorage.setItem("nowId",x.DeviceName);
    console.log(localStorage.getItem("nowId"));
  };

  $scope.track=function(x){
  localStorage.setItem("nowId",x.DeviceName);
  }


  $scope.addDevice=function(){
    window.location.href='addDevice.html';
  };

})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
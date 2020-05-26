 angular.module('timeDemo', ['ngMaterial'])

.controller('AppCtrl', function($scope) {
  var DeviceId=localStorage.getItem("nowId");
  var UserId=localStorage.getItem("userId");
  console.log(DeviceId,UserId);

  $scope.getPeriod=function(){
   var starttime=$scope.starttime.getTime();
   var endtime=$scope.endtime.getTime();
   var name=$scope.name;
   localStorage.setItem("starttime",starttime);
   localStorage.setItem("endtime",endtime);
   localStorage.setItem("routineName",name);
   console.log(DeviceId,UserId,starttime,endtime,name);
   console.log(localStorage.getItem("starttime"),localStorage.getItem("endtime"));
   window.location.href='deviceMap.html';    
  }

})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
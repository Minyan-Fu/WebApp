angular.module('timeDemo', ['ngMaterial'])

.controller('AppCtrl', function($scope) {
  var DeviceId=localStorage.getItem("nowId");
  var UserId=localStorage.getItem("userId");
  console.log(DeviceId,UserId);
  $scope.getPeriod=function(){
   var starttime=$scope.starttime.getTime();
   var endtime=$scope.endtime.getTime();
   localStorage.setItem("starttime",starttime);
   localStorage.setItem("endtime",endtime);
  console.log(DeviceId,UserId,starttime,endtime);
  }

})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
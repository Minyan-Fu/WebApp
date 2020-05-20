angular.module('cardDemo2', ['ngMaterial'])

.controller('AppCtrl', function($scope,$http) { 
  $scope.routinenames=[];

  $scope.show=function(){
    console.log("get","running3");
    var getData="?userId="+localStorage.getItem("userId");
    var url = "http://192.168.137.1:8080/DBCon/RoutineServlet" + getData;
     console.log(url);
    $http.get(url).then(function success(response){
    console.log(response.data);
    var string=response.data.replace("[","").replace("]","");
    var array=string.split("},");
    for (var i = 0; i<array.length;i=i+1){
    var string2=array[i].toString();
    var array2=string2.replace("{","").replace(" ","").replace(" ","")
    .replace("}","").replace("DeviceId:","").replace("RoutineName(Id):","").split(",");
    console.log(array2[0]);
    console.log(array2[1]);
    $scope.routinenames.push({RoutineName:array2[0],DeviceId:array2[1]});
    }
    },function error(response){
        console.log("error");
    });
  };

  $scope.chooseRoutine=function(y){
    console.log(y.DeviceId);
    var routineId=y.DeviceId.toString();
    var routineId2=routineId.replace(")","").split("(");
    localStorage.setItem("routineId",routineId2[1]);
    console.log(localStorage.getItem("routineId"));
  };

})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
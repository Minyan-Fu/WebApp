angular
  .module('Demo', ['ngMaterial', 'ngMessages'])
  .controller('DemoCtrl', function($scope,$http) {
    $scope.user = {
      name: '',
      phone: '',
      id: '',
    };
    $scope.visible = true;
    function delayURL(url, time) {
    setTimeout("top.location.href='" + url + "'", time);
    }
     $scope.login=function(){
      console.log("get","running");
      var getData = "?account="+$scope.user.name+"&"+"password="+$scope.user.phone;
      var url = "http://192.168.137.1:8080/DBCon/LoginServlet" + getData;
      $http.get(url).then(function success(response){
        console.log(response.data);
        if(response.data=="200:login successfully"){
        $scope.visible=false;
        localStorage.setItem("userAccount", $scope.user.name);
        console.log(localStorage.getItem("userAccount"));
        //delayURL('hello.html','2000');
        }
        else{
          $scope.visible=true;
        }
      },function error(response){
        console.log("error");
      });

      console.log("get","running2");
      var getData="?userName="+localStorage.getItem("userAccount");
      console.log(getData);
      var url = "http://192.168.137.1:8080/DBCon/idGetServlet" + getData;
      $http.get(url).then(function success(response){
        console.log(response.data);
         localStorage.setItem("userId", response.data);
         console.log(localStorage.getItem("userId"));
      },function error(response){
        console.log("error");
      });
     }

    });

        
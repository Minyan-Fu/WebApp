angular
  .module('Demo', ['ngMaterial', 'ngMessages'])
  .controller('DemoCtrl', function($scope,$http) {
    $scope.user = {
      name: '',
      phone: '',
    };

     $scope.login=function()
    {
        var postData = "?userAccount="+$scope.user.name+"&"+"userPassword="+$scope.user.phone;
        var url = "http://192.168.137.1:8080/DBCon/LoginServlet" + postData;
        $http.post(url).success(function(data) {
            console.log(data);
        });
    };

    $scope.register=function()
    {
        var postData = "?userAccount="+$scope.user.name+"&"+"userPassword="+$scope.user.phone;
        var url = "http://192.168.137.1:8080/DBCon/LoginServlet" + postData;

         $http.post(url).success(function(data) {
            console.log(data);
    });
  }

});


        
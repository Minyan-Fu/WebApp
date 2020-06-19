angular.module('addDevice', ['ngMaterial', 'ngMessages'])
  .controller('addDeviceCtlr', function ($scope, $http) {
    $scope.checkData = {
      nameCheck: 'k',
    };

    $scope.device = {
      name: ''
    };

    $scope.testData={
      i:''
    }

    $scope.checkName = function () {
      if ($scope.device.name) {
        $scope.checkData.nameCheck = "r";
        return true;
      } else {
        $scope.checkData.nameCheck = "m";
        return false;
      }
    };

    function delayURL(url, time) {
      setTimeout("top.location.href='" + url + "'", time);
    }

    $scope.generate = function () {
      var nameFlag = $scope.checkName();
      if (nameFlag) {
        console.log("get", "running");
        var userId = localStorage.getItem("userId");
        console.log(userId);
        var getData = "?deviceName=" + $scope.device.name + "&userId=" + userId;
        var url = "http://192.168.137.1:8080/DBCon/addDeviceServlet" + getData;
        console.log(url);
        $http.get(url).then(function success(response) {
          console.log(response.data);
          if (response.data == "insert successfully") {
            $scope.testData.i="insert successfully! Please wait for redirecting.";
            document.getElementById("p2").innerHTML = "insert successfully! Please wait for redirecting.";
            //delayURL('device.html', '2000');
          }
          else {
             $scope.testData.i="error.";
            document.getElementById("p2").innerHTML = "please try again";
          }
          return response.data;
        }, function error(response) {
          console.log("error");
        });
      }
      return $scope.testData.i;
    }

  });


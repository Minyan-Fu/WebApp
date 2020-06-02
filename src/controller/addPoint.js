angular.module('addPoints', ['ngMaterial', 'ngMessages'])
  .controller('addPointsCtlr', function ($scope, $http) {
    $scope.checkData = {
      nameCheck: 'k',
    };

    $scope.point = {
      description: ''
    };

    $scope.checkName = function () {
      if ($scope.point.description) {
        $scope.checkData.nameCheck = "r";
        return true;
      } else {
        $scope.checkData.nameCheck = "m";
        return false;
      }
    };


    $scope.addPoint = function () {
      var nameFlag = $scope.checkName();
      if (nameFlag) {
        console.log("get", "running");
        var routineId = localStorage.getItem("routineId");
        var Latitude = localStorage.getItem("nowLatitude");
        var Longitude = localStorage.getItem("nowLongitude");
        var Point = Longitude + "," + Latitude;
        console.log(routineId, Point, $scope.point.description);
        var getData = "?location=POINT(" + Point + ")" + "&routineId=" + routineId + "&content=" + $scope.point.description;
        var url = "http://192.168.137.1:8080/DBCon/addPointServlet" + getData;
        console.log(url);
        $http.get(url).then(function success(response) {
          console.log(response.data);
          if (response.data == "insert successfully") {
            document.getElementById("p2").innerHTML = "insert successfully!";
          }
          else {
            $scope.visible = true;
            document.getElementById("p2").innerHTML = "please try again";
          }
        }, function error(response) {
          console.log("error");
        });
      }
    };

  });


angular.module('LoginPanel', ['ngMaterial', 'ngMessages'])
  .controller('LoginPanelCtrl', function($scope,$http) {
    $scope.user = {
      name: '',
      password: '',
      id: '',
    };

     $scope.checkData ={
            nameCheck:'k',
            passwordCheck:'k',
        };

    $scope.visible = true;
    function delayURL(url, time) {
    setTimeout("top.location.href='" + url + "'", time);
    }


     $scope.login=function(){
        var nameFlag = $scope.checkName();
            var passwordFlag = $scope.checkPassword();
            if(nameFlag && passwordFlag){
      console.log("get","running");
      var getData = "?account="+$scope.user.name+"&"+"password="+$scope.user.password;
      var url = "http://192.168.137.1:8080/DBCon/LoginServlet" + getData;
      $http.get(url).then(function success(response){
        console.log(response.data);
        if(response.data=="200:login successfully"){
        $scope.visible=false;
        localStorage.setItem("userAccount", $scope.user.name);
        console.log(localStorage.getItem("userAccount"));
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
        delayURL('device.html','2000');
        }
        else{
          $scope.visible=true;
          document.getElementById("p2").innerHTML="login failed. Please check the data.";
        }
      },function error(response){
        console.log("error");
      });
    }
     }

     $scope.register=function(){
        var nameFlag = $scope.checkName();
            var passwordFlag = $scope.checkPassword();
            if(nameFlag && passwordFlag){
      console.log("get","running");
      var getData = "?account="+$scope.user.name+"&"+"password="+$scope.user.password;
      var url = "http://192.168.137.1:8080/DBCon/RegisterServlet" + getData;
      $http.get(url).then(function success(response){
        console.log(response.data);
        if(response.data=="200:success"){
        $scope.visible=false;
        document.getElementById("usermes").innerHTML=" ";
        document.getElementById("p2").innerHTML="register successfully!";
        }
        else{
          $scope.visible=true;
          document.getElementById("p2").innerHTML="please change your name";
        }
      },function error(response){
        console.log("error");
      });
     }
    }

     $scope.checkName = function(){
        if($scope.user.name){
           $scope.checkData.nameCheck = "r";
            return true;
        }else{
            $scope.checkData.nameCheck = "m";
        return false;
        }
        };

         $scope.checkPassword = function(){
             if($scope.user.password){
           $scope.checkData.passwordCheck = "r";
            return true;
        }else{
            $scope.checkData.passwordCheck = "m";
        return false;
        }
 };



    });

        
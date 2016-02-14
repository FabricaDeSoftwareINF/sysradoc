angular.module('app').controller("ngAllRadocsCtrl", function($scope, ngUserSvc, ngRadocSvc, ngIdentity, ngNotifier){
    $scope.data = {
        teacher: "",
        teachers: ngUserSvc.getAllUsersByCategory("Professor"),
        allRadocs: [],
    };


    $scope.$watch('data.teacher', function(newValue, oldValue) {
        if (newValue)
            $scope.data.allRadocs = ngRadocSvc.getRadocsByUser(newValue);
    });
});

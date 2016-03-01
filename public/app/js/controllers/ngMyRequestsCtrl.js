angular.module('app').controller("ngMyRequestsCtrl", function($scope, ngRequestSvc, ngIdentity, ngNotifier){
    $scope.data = {
        allRequests: ngRequestSvc.getRequestsByUser(ngIdentity.currentUser._id),
        today: new Date()
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    var reloadRequests = function(){
        $scope.data.allRequests = ngRequestSvc.getRequestsByUser(ngIdentity.currentUser._id);
    };
});

angular.module('app').controller("ngMyRequestsCtrl", function($scope, ngRequestSvc, ngIdentity, ngNotifier){
    $scope.data = {
        allRequests: ngRequestSvc.getRequestsByUser(ngIdentity.currentUser._id),
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    var reloadRequests = function(){
        $scope.data.allRequests = ngRequestSvc.getRequestsByUser(ngIdentity.currentUser._id);
    };
});

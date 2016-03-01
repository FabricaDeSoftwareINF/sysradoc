angular.module('app').controller("ngMyProcessesCtrl", function($scope, ngUserSvc, ngProcessSvc, ngIdentity, ngNotifier){
    $scope.data = {
        allProcesses: ngProcessSvc.getProcessesByUser(ngIdentity.currentUser._id),
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    var reloadProcesses = function(){
        $scope.data.allProcesses = ngProcessSvc.getProcessesByUser(ngIdentity.currentUser._id);
    };
});

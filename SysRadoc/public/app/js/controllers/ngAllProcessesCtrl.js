angular.module('app').controller("ngAllProcessesCtrl", function($scope, ngProcessSvc, ngIdentity, ngNotifier){
    $scope.data = {
        allProcesses: ngProcessSvc.getAllProcesses(),
        filteredProcesses: [],
        filter: ""
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    var reloadProcesses = function(){
        $scope.data.allProcesses = ngUserSvc.getAllProcesses();
    };

    var applyFilter = function(){
        if ($scope.data.filter === "")
            $scope.data.filteredProcesses = $scope.data.allProcesses;
    };

    $scope.$watch('data.allProcesses', function(newValue, oldValue) {
        applyFilter();
    }, true);

    $scope.$watch('data.filter', function(newValue, oldValue) {
        applyFilter();
    });
});

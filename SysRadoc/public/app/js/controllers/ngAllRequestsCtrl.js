angular.module('app').controller("ngAllRequestsCtrl", function($scope, ngUserSvc, ngRequestSvc, ngIdentity, ngNotifier, $location){
    $scope.data = {
        allRequests: ngRequestSvc.getAllRequests(),
        filterType: "professor",
        filter: "",
        maxIndex: 0
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };


    var reloadRequests = function(){
        $scope.data.allRequests = ngRequestSvc.getAllRequests();
    };

    var applyFilter = function(){
        var maxIndex = 0;
        for (var p = 0; p < $scope.data.allRequests.length; p++){
            var req = $scope.data.allRequests[p];
            if ($scope.data.filter === ""){
                req.hidden = undefined;
                maxIndex++;
            }

            else{
                var field = "";
                if ($scope.data.filterType === "professor")
                    field = req.idUsuario.nome;
                else if ($scope.data.filterType === "tipo"){
                    field = req.tipo;

                }
                if (field.indexOf($scope.data.filter) !== -1){
                    req.hidden = undefined;
                    maxIndex++;
                }
                else{
                    req.hidden = true;
                }
            }
        }

        $scope.data.maxIndex = maxIndex;
    };

    $scope.openProcess = function(index){
        var request = $scope.data.allRequests[index];
        $location.path("/newProcess").search({professor: request.idUsuario._id, tipo: request.tipo, dataDeInicio: request.dataDeInicio, dataFim: request.dataFim});
    };

    $scope.$watch('data.allRequests', function(newValue, oldValue) {
        applyFilter();
    }, true);

    $scope.$watch('data.filter', function(newValue, oldValue) {
        applyFilter();
    });

    $scope.$watch('data.filterType', function(newValue, oldValue) {
        applyFilter();
    });
});

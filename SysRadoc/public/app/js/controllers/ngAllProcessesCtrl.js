angular.module('app').controller("ngAllProcessesCtrl", function($scope, ngUserSvc, ngProcessSvc, ngIdentity, ngNotifier){
    $scope.data = {
        allProcesses: ngProcessSvc.getAllProcesses(),
        filteredProcesses: [],
        filter: "",
        evaluators: [],
        teachers: ngUserSvc.getAllUsersByCategory("Professor"),
        associate: {
            idAvaliador: "",
            index: 0
        }
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    $scope.callAssociate = function(index){
        var process = $scope.data.filteredProcesses[index];
        var idAvaliador = "-1";
        if (process.idAvaliador)
            idAvaliador = process.idAvaliador._id;
        $scope.data.associate = {
            idAvaliador: idAvaliador,
            index: index
        };
    };

    $scope.finishAssociate = function(){
        if ($scope.data.filteredProcesses[$scope.data.associate.index].idProfessor._id === $scope.data.associate.idAvaliador){
            ngNotifier.error("Um professor não pode avaliar ele mesmo em um processo. Escolha outro avaliador.");
            return false;
        }
        ngProcessSvc.updateAppraiser($scope.data.filteredProcesses[$scope.data.associate.index]._id, $scope.data.associate.idAvaliador).then(function() {
            ngNotifier.notify('Relator associado com sucesso!');
            angular.element('#modalAssociate').modal('hide');
            reloadProcesses();
        }, function(data) {
            ngNotifier.error("Ocorreu um erro, tente novamente.");
            angular.element('#modalAssociate').modal('hide');
        });
    };

    var reloadProcesses = function(){
        $scope.data.allProcesses = ngProcessSvc.getAllProcesses();
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

    $scope.$watch(function(){ return $scope.data.teachers;}, function(newValue, oldValue) {
        var allUsers = $scope.data.teachers;
        var filtered = [{_id: "-1", nome: "Nenhum"}];

        for (n = 0; n < allUsers.length; n++){
            if (allUsers[n].papeis.indexOf("CAD") !== -1){
                filtered.push(allUsers[n]);
            }
        }

        $scope.data.evaluators = filtered;
    }, true);
});

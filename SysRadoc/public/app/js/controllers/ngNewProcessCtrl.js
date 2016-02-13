angular.module('app').controller("ngNewProcessCtrl", function($scope, ngNotifier, ngProcessSvc, ngUserSvc) {
    var cleanNewProcessData = {
        tipo: "",
        dataDeInicio: new Date(),
        dataFim: new Date(),
        idProfessor: "",
        idAvaliador: ""
    };

    $scope.data = {
        newProcess: angular.copy(cleanNewProcessData),
        types: [
            "Estágio Probatório",
            "Progressão Funcional",
            "Promoção na Carreira de Magistério"
            ],
        evaluators: [],
        teachers: ngUserSvc.getAllUsersByCategory("Professor")
    };

    $scope.createProcess = function(){
        if ($scope.data.newProcess.idProfessor === $scope.data.newProcess.idAvaliador){
            ngNotifier.error("Um professor não pode avaliar ele mesmo em um processo. Escolha outro avaliador.");
            return false;
        }
        ngProcessSvc.createProcess($scope.data.newProcess).then(function() {
            ngNotifier.notify('Processo registrado com sucesso!');
            $scope.data.newProcess = angular.copy(cleanNewProcessData);
        }, function(data) {
            ngNotifier.error(data.reason);
        });
    };

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

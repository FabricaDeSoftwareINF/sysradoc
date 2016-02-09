angular.module('app').controller("ngNewProcessCtrl", function($scope, ngNotifier, ngProcessSvc, ngUserSvc) {
    var cleanNewProcessData = {
        type: "",
        startDate: new Date(),
        endDate: new Date(),
        evaluatedTeacher: "",
        processEvaluator: ""
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
        if ($scope.data.newProcess.evaluatedTeacher === $scope.data.newProcess.processEvaluator){
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

    $scope.$watch(function(scope){ return scope.data.newProcess.classe; }, function(newValue, oldValue) {
        $scope.data.newProcess.nivel = "";
    });

    $scope.$watch(function(){ return $scope.data.teachers.length;}, function(newValue, oldValue) {
        var allUsers = $scope.data.teachers;
        var filtered = [];

        for (n = 0; n < allUsers.length; n++){
            if (allUsers[n].papeis.indexOf("CAD") !== -1){
                filtered.push(allUsers[n]);
            }
        }

        $scope.data.evaluators = filtered;
    });

});

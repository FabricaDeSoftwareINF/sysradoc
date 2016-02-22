angular.module('app').controller("ngNewProcessCtrl", function($scope, $timeout, ngNotifier, ngProcessSvc, ngUserSvc, $location) {

    var cleanNewProcessData = {
        tipo: "",
        dataDeInicio: new Date(),
        dataFim: new Date(),
        idProfessor: "",
        idAvaliador: ""
    };

    $scope.data = {
        today: new Date(),
        newProcess: angular.copy(cleanNewProcessData),
        types: [
            "Estágio Probatório",
            "Progressão Funcional",
            "Promoção na Carreira de Magistério"
            ],
        evaluators: [],
        teachers: ngUserSvc.getAllUsersByCategory("Professor")
    };

    $scope.getMinDate = function(){
        if ($scope.data.newProcess.idProfessor === "")
            return $scope.data.today;

        for (var index = 0; index < $scope.data.teachers.length; index++){
            if ($scope.data.teachers[index]._id === $scope.data.newProcess.idProfessor){
                return $scope.data.teachers[index].dataDeIngresso;
            }
        }
    };

    $scope.createProcess = function(){
        if ($scope.data.newProcess.idProfessor === $scope.data.newProcess.idAvaliador){
            ngNotifier.error("Um professor não pode avaliar ele mesmo em um processo. Escolha outro avaliador.");
            return false;
        }
        ngProcessSvc.createProcess($scope.data.newProcess).then(function() {
            ngNotifier.notify('Processo registrado com sucesso!');
            $location.path("/allProcesses").search({});
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

    var checkUrl = function(){
        var urlParam = $location.search();
        if (!!urlParam.professor){
            var interval = setInterval(function(){
                if ($scope.data.teachers.length > 0){
                    $scope.data.newProcess.idProfessor = urlParam.professor;
                    $timeout(function(){});
                    clearInterval(interval);
                }
            }, 500);

        }


        if (!!urlParam.tipo)
            $scope.data.newProcess.tipo = urlParam.tipo;
    };

    checkUrl();

});

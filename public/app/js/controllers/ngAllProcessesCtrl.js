angular.module('app').controller("ngAllProcessesCtrl", function($scope, ngUserSvc, ngProcessSvc, ngIdentity, ngNotifier){
    $scope.data = {
        allProcesses: ngProcessSvc.getAllProcesses(),
        filterType: "professor",
        filter: "",
        evaluators: [],
        teachers: ngUserSvc.getAllUsersByCategory("Professor"),
        associate: {
            idAvaliador: "",
            index: 0
        },
        putScore: {
            scoreType: "",
            index: 0,
            years: [],
            yearsInput: []
        },
        maxIndex: 0
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    $scope.isAuthorized = function(role){
        return ngIdentity.isAuthorized(role);
    };

    $scope.callAssociate = function(index){
        var process = $scope.data.allProcesses[index];
        var idAvaliador = "-1";
        if (process.idAvaliador)
            idAvaliador = process.idAvaliador._id;
        $scope.data.associate = {
            idAvaliador: idAvaliador,
            index: index
        };
    };

    $scope.putScore = function(index, scoreType){
        var process = $scope.data.allProcesses[index];
        var years = [];
        var yearsInput = [];
        for (var y = new Date(process.dataDeInicio).getFullYear(); y <= new Date(process.dataFim).getFullYear(); y++){
            years.push(y);
            yearsInput.push("");
        }
        $scope.data.putScore = {
            index: index,
            scoreType: scoreType,
            years: years,
            yearsInput: yearsInput
        };
    };

    $scope.finishAssociate = function(){
        if ($scope.data.allProcesses[$scope.data.associate.index].idProfessor._id === $scope.data.associate.idAvaliador){
            ngNotifier.error("Um professor não pode avaliar ele mesmo em um processo. Escolha outro avaliador.");
            return false;
        }
        ngProcessSvc.updateAppraiser($scope.data.allProcesses[$scope.data.associate.index]._id, $scope.data.associate.idAvaliador).then(function() {
            ngNotifier.notify('Relator associado com sucesso!');
            angular.element('#modalAssociate').modal('hide');
            reloadProcesses();
        }, function(data) {
            ngNotifier.error("Ocorreu um erro, tente novamente.");
            angular.element('#modalAssociate').modal('hide');
        });
    };

    $scope.finishAddScore = function(){

    };

    var reloadProcesses = function(){
        $scope.data.allProcesses = ngProcessSvc.getAllProcesses();
    };

    var applyFilter = function(){
        var maxIndex = 0;
        for (var p = 0; p < $scope.data.allProcesses.length; p++){
            var proc = $scope.data.allProcesses[p];
            if ($scope.data.filter === ""){
                proc.hidden = undefined;
                maxIndex++;
            }

            else{
                var field = "";
                if ($scope.data.filterType === "professor")
                    field = proc.idProfessor.nome;
                else if ($scope.data.filterType === "avaliador"){
                    if (proc.idAvaliador)
                        field = proc.idAvaliador.nome;

                }
                if (field.indexOf($scope.data.filter) !== -1){
                    proc.hidden = undefined;
                    maxIndex++;
                }
                else{
                    proc.hidden = true;
                }
            }
        }

        $scope.data.maxIndex = maxIndex;
    };

    $scope.$watch('data.allProcesses', function(newValue, oldValue) {
        applyFilter();
    }, true);

    $scope.$watch('data.filter', function(newValue, oldValue) {
        applyFilter();
    });

    $scope.$watch('data.filterType', function(newValue, oldValue) {
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

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
        evaluators: getAllUsersFromARole("Avaliador"),
        teachers: getAllUsersFromARole("Professor")
    };

    $scope.createProcess = function(){
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

    function getAllUsersFromARole(role){
        var i = 0;
        var usersFiltered = [];
        var allUsers = ngUserSvc.getAllUsers();

        console.log(allUsers);

        for (n = 0; n < allUsers.length; n++){

            console.log("allUsers["+x+"] = " + allUsers[x]);
            console.log("._categoria = " + allUsers[x]._categoria);

            if(allUsers[x]._categoria === role){

                console.log("MATCH!");

                usersFiltered[i++] = allUsers[x];
            }
        }

        console.log("role = " + role);
        console.log(usersFiltered);

        return usersFiltered;
    }

});

angular.module('app').controller("ngNewUserCtrl", function($scope, ngNotifier, ngAuth, ngIdentity) {
    $scope.data = {
        newUser: {
            nome: "",
            emailRequest: "",
            matricula: "",
            papeis: [],
            categoria: "",

            // Professor data
            dataDeIngresso: new Date(),
            classe: "",
            nivel: ""
        },
        userTypes: {
            Administrador: [
                "Secretaria",
                "Professor"
            ],
            Secretaria: [
                "Professor"
            ]
        },
        classes: [
            "A",
            "B",
            "C",
            "D",
            "E"
        ],
        levels: {
            A: [1, 2],
            B: [1, 2],
            C: [1, 2, 3, 4],
            D: [1, 2, 3, 4],
            E: [1]
        },

    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    $scope.createUser = function(){
        ngAuth.createUser($scope.data.newUser).then(function() {
            ngNotifier.notify('Usuário criado com sucesso!');
        }, function(data) {
            ngNotifier.error(data.reason);
        });
    };

    $scope.$watch(function(scope){ return scope.data.newUser.classe; }, function(newValue, oldValue) {
        $scope.data.newUser.nivel = "";
    });
});

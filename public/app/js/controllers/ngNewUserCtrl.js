angular.module('app').controller("ngNewUserCtrl", function($scope, ngNotifier, ngAuth, ngIdentity) {
    var cleanNewUserData = {
        nome: "",
        emailRequest: "",
        matricula: "",
        papeis: [],
        categoria: "",

        // Professor data
        dataDeIngresso: new Date(),
        classe: "",
        nivel: "",
        notANewTeacher: false,
        estagioProbatorioCompleto: false,
        dataEntradaUltimoNivel: new Date(),
        dataFimUltimoProcesso: new Date()
    };

    $scope.data = {
        newUser: angular.copy(cleanNewUserData),
        userTypes: {
            Administrador: [
                "Secretaria",
                "Professor"
            ],
            Secretaria: [
                "Secretaria",
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
        classesNames: [
            "Classe A - Docente Adjunto A, Docente Assistente A, e Docente Auxiliar",
            "Classe B - Docente Assistente",
            "Classe C - Docente Adjunto",
            "Classe D - Docente Associado",
            "Classe E - Docente Titular"
        ],
        levels: {
            A: ["1", "2"],
            B: ["1", "2"],
            C: ["1", "2", "3", "4"],
            D: ["1", "2", "3", "4"],
            E: ["1"]
        },
        today: new Date()

    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    $scope.createUser = function(){
        ngAuth.createUser($scope.data.newUser).then(function() {
            ngNotifier.notify('Usuário criado com sucesso!');
            $scope.data.newUser = angular.copy(cleanNewUserData);
        }, function(data) {
            ngNotifier.error(data.reason);
        });
    };

    $scope.$watch(function(scope){ return scope.data.newUser.classe; }, function(newValue, oldValue) {
        $scope.data.newUser.nivel = "";
    });

});

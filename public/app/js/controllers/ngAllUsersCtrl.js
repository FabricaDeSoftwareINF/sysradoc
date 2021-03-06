angular.module('app').controller("ngAllUsersCtrl", function($scope, ngUserSvc, ngIdentity, ngNotifier){
    $scope.data = {
        users: ngUserSvc.getAllUsers(),
        removing: {
            email: "",
            name: ""
        },
        editing: {
            index: -1,
            email: "",
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
            {id: "A", label: "Classe A - Docente Adjunto A, Docente Assistente A, e Docente Auxiliar"},
            {id: "B", label: "Classe B - Docente Assistente"},
            {id: "C", label: "Classe C - Docente Adjunto"},
            {id: "D", label: "Classe D - Docente Associado"},
            {id: "E", label: "Classe E - Docente Titular"}
        ],
        levels: {
            A: ["1", "2"],
            B: ["1", "2"],
            C: ["1", "2", "3", "4"],
            D: ["1", "2", "3", "4"],
            E: ["1"]
        },
    };

    $scope.getUserType = function(){
        return ngIdentity.getAccessLevel();
    };

    $scope.callRemove = function(index){
        var user = $scope.data.users[index];
        $scope.data.removing = {email: user.email, name: user.nome};
    };

    $scope.callEdit = function(index){
        var user = $scope.data.users[index];
        $scope.data.editing = {
            index: index,
            nome: user.nome,
            email: user.email,
            emailRequest: user.email,
            matricula: user.matricula,
            papeis: user.papeis,
            categoria: user._categoria,
            dataDeIngresso: user.dataDeIngresso || new Date(),
            classe: user.classe || "",
            nivel: user.nivel || ""
        };
    };

    $scope.finishRemove = function(){
        ngUserSvc.removeUser($scope.data.removing.email).then(function() {
            ngNotifier.notify('Usuário removido com sucesso!');
            reloadUsers();
        }, function(data) {
            ngNotifier.error("Ocorreu um erro, tente novamente.");
        });
    };

    $scope.finishEdit = function(){
        ngUserSvc.updateUser($scope.data.editing).then(function() {
            ngNotifier.notify('Usuário atualizado com sucesso!');
            reloadUsers();
        }, function(data) {
            ngNotifier.error("Ocorreu um erro, tente novamente.");
        });
    };

    var reloadUsers = function(){
        $scope.data.users = ngUserSvc.getAllUsers();
    };

    $scope.$watch(function(scope){ return scope.data.editing.classe; }, function(newValue, oldValue) {
        if (newValue !== "" && newValue !== $scope.data.users[$scope.data.editing.index].classe){
            $scope.data.editing.nivel = $scope.data.levels[newValue][0];
        }
        else if (newValue !== "" && newValue === $scope.data.users[$scope.data.editing.index].classe){
            $scope.data.editing.nivel = $scope.data.users[$scope.data.editing.index].nivel;
        }

    });
});

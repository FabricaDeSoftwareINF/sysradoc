angular.module('app').controller('ngAccountCtrl', function ($scope, ngAuth, ngNotifier, ngIdentity, $location) {
    $scope.data = {
        modifiedUser: {
            name: "",
            instructorClass: "-1",
            emailR: "",
            password: "",
            repeatPassword: ""
        },
        editing: false,
        identity = ngIdentity,
        buttonLabel: "Editar Informações",
    };

    $scope.enable_disable_input = function(){
      $scope.data.editing = !$scope.data.editing;
      if(!$scope.data.editing){
        $scope.data.buttonLabel: "Salvar Alterações";
      }
      else {
        modifyUser();
      }
    }

//TODO-1 Prencher os valores de modifiedUser com os valores de currentUser para que as validações abaixo funcionem
//TODO-2 Validações adicionais ainda restam

    var modifyUser = function(){
        if ($scope.data.modifiedUser.emailR === $scope.data.identity.emailR &&
        $scope.data.modifiedUser.password === $scope.data.identity.password &&
        $scope.data.modifiedUser.name === $scope.data.identity.name &&
        $scope.data.modifiedUser.instructorClass === $scope.data.identity.instructorClass){
            ngNotifier.error('Não houve alterações nos dados.');
            return false;
        }

        if ($scope.data.modifiedUser.password === $scope.data.identity.repeatPassword){
            ngNotifier.error('As senhas nova e atual são iguais.');
            return false;
        }

        if ($scope.data.modifiedUser.password !== $scope.data.modifiedUser.repeatPassword){
            ngNotifier.error('As senhas não coincidem.');
            return false;
        }

        if ($scope.data.modifiedUser.password.length < 6){
            ngNotifier.error('A senha deve possuir no mínimo 6 caracteres.');
            return false;
        }

        ngAuth.updateUser($scope.data.identity.emailR, $scope.data.modifiedUser).then(function() {
            ngNotifier.notify('Dados do usuário modificados com sucesso!');
            $location.path('/');
        }, function(reason) {
            ngNotifier.error(reason.substr(reason.search(' ') + 1));
        });
    };

});

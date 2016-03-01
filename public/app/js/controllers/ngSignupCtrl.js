angular.module('app').controller('ngSignupCtrl', function ($scope, ngAuth, ngNotifier, $location) {
    $scope.data = {
        signup: {
            name: "",
            instructorClass: "-1",
            emailRequest: "",
            password: "",
            repeatPassword: ""
        }
    };

    $scope.signup = function(){
        if ($scope.data.signup.emailRequest === "" ||
        $scope.data.signup.password === "" ||
        $scope.data.signup.name === "" ||
        $scope.data.signup.instructorClass === "-1"){
            ngNotifier.error('Preencha todos os campos de cadastro.');
            return false;
        }

        if ($scope.data.signup.password !== $scope.data.signup.repeatPassword){
            ngNotifier.error('As senhas não coincidem.');
            return false;
        }

        if ($scope.data.signup.password.length < 6){
            ngNotifier.error('A senha deve possuir no mínimo 6 caracteres.');
            return false;
        }

        ngAuth.createUser($scope.data.signup).then(function() {
            ngNotifier.notify('Usuário criado com sucesso!');
            $location.path('/');
        }, function(reason) {
            ngNotifier.error(reason.substr(reason.search(' ') + 1));
        });
    };
});

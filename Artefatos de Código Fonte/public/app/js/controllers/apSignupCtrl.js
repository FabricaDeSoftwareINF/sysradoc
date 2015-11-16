angular.module('app').controller('apSignupCtrl', function ($scope, apAuth, apNotifier, $location) {
    $scope.data = {
        signup: {
            name: "",
            instructorClass: "-1",
            email: "",
            password: "",
            repeatPassword: ""
        }
    };

    $scope.signup = function(){
        if ($scope.data.signup.email === "" ||
        $scope.data.signup.password === "" ||
        $scope.data.signup.name === "" ||
        $scope.data.signup.instructorClass === "-1"){
            apNotifier.error('Preencha todos os campos de cadastro.');
            return false;
        }

        if ($scope.data.signup.password !== $scope.data.signup.repeatPassword){
            apNotifier.error('As senhas não coincidem.');
            return false;
        }

        if ($scope.data.signup.password.length < 6){
            apNotifier.error('A senha deve possuir no mínimo 6 caracteres.');
            return false;
        }

        apAuth.createUser($scope.data.signup).then(function() {
            apNotifier.notify('Usuário criado com sucesso!');
            $location.path('/dashboard');
        }, function(reason) {
            apNotifier.error(reason.substr(reason.search(' ') + 1));
        });
    };
});

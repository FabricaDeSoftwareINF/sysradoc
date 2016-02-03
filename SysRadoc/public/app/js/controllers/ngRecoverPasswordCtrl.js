angular.module('app').controller('ngRecoverPasswordCtrl', function ($scope, ngUser, ngUserSvc, ngNotifier, $location) {
    $scope.data = {
        recovery: {
            email: ""
        }
    };

    $scope.recover = function(){
        if ($scope.data.recovery.email === ""){
            ngNotifier.error('Informe um email válido.');
            return false;
        }

        ngUserSvc.recoverUserPassword($scope.data.recovery.email).then(function (success) {
            ngNotifier.notify('As instruções de recuperação de senha foram enviadas por email.');
            $location.path("/");
        },
        function () {
            ngNotifier.error('O email informado não pertence a nenhuma conta.');
        });
    };
});

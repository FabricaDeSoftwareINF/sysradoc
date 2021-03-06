angular.module('app').controller("ngNewRequestCtrl", function($scope, ngNotifier, ngRequestSvc, ngIdentity) {
    var cleanNewRequestData = {
        tipo: "",
        idUsuario: ngIdentity.currentUser._id,
        dataDeInicio: new Date(),
        dataFim: new Date()
    };

    $scope.data = {
        newRequest: angular.copy(cleanNewRequestData),
        types: [
            "Progressão Funcional",
            "Promoção na Carreira de Magistério"
            ]
    };

    $scope.getLastProcessDate = function(){
        return ngIdentity.currentUser.dataFimUltimoProcesso || ngIdentity.currentUser.dataDeIngresso || new Date();
    };

    $scope.createRequest = function(){
        ngRequestSvc.createRequest($scope.data.newRequest).then(function() {
            ngNotifier.notify('Processo registrado com sucesso!');
            $scope.data.newRequest = angular.copy(cleanNewRequestData);
        }, function(data) {
            ngNotifier.error(data.reason);
        });
    };


});

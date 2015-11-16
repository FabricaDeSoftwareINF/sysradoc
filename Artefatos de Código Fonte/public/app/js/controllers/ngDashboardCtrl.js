angular.module('app').controller('ngDashboardCtrl', function ($scope, FileUploader, ngNotifier, ngIdentity) {
    $scope.data = {
        sendRadoc: {
            tab: 0,
            tabs: [
                "Enviar Radoc",
                "Validar Radoc",
                "Finalizar Envio"
            ],
            failed: false,
            uploader: new FileUploader()
        }
    };

    $scope.data.sendRadoc.uploader.queueLimit = 1;
    $scope.data.sendRadoc.uploader.url = "/api/radoc/";
    $scope.data.sendRadoc.uploader.alias = "radoc";

    $scope.data.sendRadoc.uploader.onSuccessItem = function(item, response, status, headers){
        if (response.success){
            ngNotifier.notify("Arquivo enviado com sucesso!");
            $scope.data.sendRadoc.tab = 2;
        }
        else{
            ngNotifier.error("O arquivo enviado não é um PDF ou não se assemelha aos padrões de um Radoc.");
            $scope.data.sendRadoc.failed = true;
        }
        $scope.data.sendRadoc.uploader.clearQueue();
    };

    $scope.data.sendRadoc.uploader.onErrorItem = function(item, response, status, headers){
        ngNotifier.error("Ocorreu um erro no envio do arquivo. Tente novamente.");
        $scope.data.sendRadoc.uploader.clearQueue();
        $scope.data.sendRadoc.failed = true;
    };

    $scope.data.sendRadoc.uploader.onBeforeUploadItem = function(item, response, status, headers){
        $scope.data.sendRadoc.tab = 1;
    };

    $scope.data.sendRadoc.uploader.onWhenAddingFileFailed = function(item, filter, options){
        $scope.data.sendRadoc.uploader.clearQueue();
        $scope.data.sendRadoc.uploader.addToQueue(item);
    };

    $('#radoc-button').click(function(){
        $('#radoc-input').click();
    });

    $scope.goToTab = function(index){
        $scope.data.sendRadoc.failed = false;
        if (index < $scope.data.sendRadoc.tab)
            $scope.data.sendRadoc.tab = index;
    };

    $scope.upload = function(){
        if ($scope.data.sendRadoc.uploader.queue.length === 0){
            ngNotifier.error("Selecione um arquivo antes de continuar.");
            return false;
        }
        $scope.data.sendRadoc.uploader.uploadAll();
    };
});

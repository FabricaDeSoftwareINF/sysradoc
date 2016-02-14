angular.module('app').controller('ngSendRadocCtrl', function ($scope, FileUploader, ngNotifier, ngUserSvc, ngIdentity, $location) {
    $scope.data = {
        teacher: "",
        teachers: ngUserSvc.getAllUsersByCategory("Professor"),
        sending: false,
        sendRadoc: {
            uploader: new FileUploader()
        }
    };

    $scope.data.sendRadoc.uploader.queueLimit = 1;
    $scope.data.sendRadoc.uploader.url = "/api/radoc/";
    $scope.data.sendRadoc.uploader.alias = "radoc";

    $scope.data.sendRadoc.uploader.onSuccessItem = function(item, response, status, headers){
        if (response.success){
            if (!response.updated)
                ngNotifier.notify("Radoc enviado com sucesso!");
            else
                ngNotifier.notify("Radoc atualizado com sucesso!");
            $location.path("/allRadocs");
        }
        else{
            ngNotifier.error(response.reason);
            $scope.data.sending = false;
        }
        $scope.data.sendRadoc.uploader.clearQueue();
    };

    $scope.data.sendRadoc.uploader.onErrorItem = function(item, response, status, headers){
        ngNotifier.error("Ocorreu um erro no envio do arquivo. Tente novamente.");
        $scope.data.sendRadoc.uploader.clearQueue();
        $scope.data.sending = false;
    };

    $scope.data.sendRadoc.uploader.onBeforeUploadItem = function(item){
        $scope.data.sending = true;
    };

    $scope.data.sendRadoc.uploader.onWhenAddingFileFailed = function(item, filter, options){
        $scope.data.sendRadoc.uploader.clearQueue();
        $scope.data.sendRadoc.uploader.addToQueue(item);
    };

    angular.element('#radoc-button').click(function(){
        angular.element('#radoc-input').click();
    });

    $scope.upload = function(){
        if ($scope.data.sendRadoc.uploader.queue.length === 0){
            ngNotifier.error("Selecione um arquivo antes de continuar.");
            return false;
        }
        $scope.data.sendRadoc.uploader.queue[0].url = ("/api/radoc/" + $scope.data.teacher);
        $scope.data.sendRadoc.uploader.uploadAll();
    };
});

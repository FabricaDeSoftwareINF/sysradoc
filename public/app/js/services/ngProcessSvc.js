angular.module('app').factory('ngProcessSvc', function ($q, ngProcess) {
    return {

        getAllProcesses: function(){
            return ngProcess.query();
        },

        getProcessesByUser: function(id){
            return ngProcess.query({id: id});
        },

        createProcess: function (newProcessData) {
            var newProcess = new ngProcess(newProcessData);
            var dfd = $q.defer();

            newProcess.$save().then(function (response) {
                if(response.success)
                    dfd.resolve();
                else
                    dfd.reject(response);
            }, function (response) {
                dfd.reject({reason: "Não foi possível enviar o pedido de criação de processo."});
            });

            return dfd.promise;
        },

        updateAppraiser: function(id, idAvaliador){
            var proc = new ngProcess({id: id, idAvaliador: idAvaliador});
            var dfd = $q.defer();

            proc.$update().then(function (response) {
                if(response.success)
                    dfd.resolve();
                else
                    dfd.reject(response);
            }, function (response) {
                dfd.reject({reason: "Não foi possível enviar o pedido de criação de processo."});
            });

            return dfd.promise;
        },

        updateProcess: function(data){
            var updateProcess = new ngProcess(data);
            var dfd = $q.defer();

            updateProcess.$update().then(function (response) {
                dfd.resolve(response.data);
            }, function (response) {
                dfd.reject(response.data);
            });

            return dfd.promise;
        },

        removeProcess: function(id) {
            var dfd = $q.defer();
              ngProcess.remove({id: id}).$promise.then(function(){
                dfd.resolve();
            },
            function(){
                dfd.reject();
            });
            return dfd.promise;
        },

    };
});

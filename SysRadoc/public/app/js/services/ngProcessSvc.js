angular.module('app').factory('ngProcessSvc', function ($q, ngProcess) {
    return {

        getAllProcesses: function(){
            return ngProcess.query();
        },

        createProcess: function (newProcessData) {
            var newProcess = new ngProcess(newProcessData);
            var dfd = $q.defer();

            newProcess.$save().then(function (response) {
                dfd.resolve(response.data);
            }, function (response) {
                dfd.reject(response.data);
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
              ngUser.remove({id: id}).$promise.then(function(){
                dfd.resolve();
            },
            function(){
                dfd.reject();
            });
            return dfd.promise;
        },

    };
});

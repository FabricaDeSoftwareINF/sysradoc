angular.module('app').factory('ngRequestSvc', function ($q, ngRequest) {
    return {

        getAllRequests: function(){
            return ngRequest.query();
        },

        getRequestsByUser: function(id){
            return ngRequest.query({id: id});
        },

        createRequest: function (newRequestData) {
            var newRequest = new ngRequest(newRequestData);
            var dfd = $q.defer();

            newRequest.$save().then(function (response) {
                if(response.success)
                    dfd.resolve();
                else
                    dfd.reject(response);
            }, function (response) {
                dfd.reject({reason: "Não foi possível enviar o pedido de criação de Requesto."});
            });

            return dfd.promise;
        },

        removeRequest: function(id) {
            var dfd = $q.defer();
              ngRequest.remove({id: id}).$promise.then(function(){
                dfd.resolve();
            },
            function(){
                dfd.reject();
            });
            return dfd.promise;
        },

    };
});

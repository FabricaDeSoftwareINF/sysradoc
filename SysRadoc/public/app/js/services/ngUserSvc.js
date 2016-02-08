angular.module('app').factory('ngUserSvc', function ($q, ngUser) {
    return {

        getAllUsers: function(){
            return ngUser.query();
        },

        updateUser: function(data){
            var updateUser = new ngUser(data);
            var dfd = $q.defer();

            updateUser.$update().then(function (response) {
                dfd.resolve(response.data);
            }, function (response) {
                dfd.reject(response.data);
            });

            return dfd.promise;
        },

        removeUser: function(email) {
            var dfd = $q.defer();
            ngUser.remove({email: email}).$promise.then(function(){
                dfd.resolve();
            },
            function(){
                dfd.reject();
            });
            return dfd.promise;
        },

        recoverUserPassword: function (email) {
            var user = new ngUser();
            var dfd = $q.defer();

            user.$save({email: email}).then(function (response) {
                if (response.success === true){
                    dfd.resolve();
                }
                else {
                    dfd.reject();
                }

            }, function (response) {
                if (response.success === true){
                    dfd.resolve();
                }
                else {
                    dfd.reject();
                }
            });

            return dfd.promise;
        },

        resetUserPassword: function (email, token, password) {
            var user = new ngUser({password: password});
            var dfd = $q.defer();

            user.$save({email: email, token: token}).then(function (response) {
                if (response.success === true){
                    dfd.resolve();
                }
                else {
                    dfd.reject();
                }

            }, function (response) {
                if (response.success === true){
                    dfd.resolve();
                }
                else {
                    dfd.reject();
                }
            });

            return dfd.promise;
        },

    };
});

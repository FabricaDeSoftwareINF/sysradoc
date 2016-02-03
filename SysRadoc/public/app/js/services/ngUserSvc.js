angular.module('app').factory('ngUserSvc', function ($q, ngUser) {
    return {

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

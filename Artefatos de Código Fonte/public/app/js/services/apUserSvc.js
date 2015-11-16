angular.module('app').factory('apUserSvc', function ($q, apUser) {
    return {

        recoverUserPassword: function (email) {
            var user = new apUser();
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
            var user = new apUser({password: password});
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

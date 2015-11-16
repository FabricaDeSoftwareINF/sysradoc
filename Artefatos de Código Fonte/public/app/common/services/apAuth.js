angular.module('app').factory('apAuth', function ($http, $location, apIdentity, $q, apUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new apUser();
                    delete response.data.user.salt;
                    delete response.data.user.hashedPwd;
                    angular.extend(user, response.data.user);
                    apIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function (role) {
            if (apIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }

        },

        authorizeAuthenticatedUserForRoute: function () {
            if (apIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});

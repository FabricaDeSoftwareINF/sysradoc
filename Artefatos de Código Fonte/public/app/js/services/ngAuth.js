angular.module('app').factory('ngAuth', function ($http, $location, ngIdentity, $q, ngUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new ngUser();
                    delete response.data.user.salt;
                    delete response.data.user.hash;
                    angular.extend(user, response.data.user);
                    ngIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        createUser: function (newUserData) {
            var newUser = new ngUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                dfd.resolve(response.data);
            }, function (response) {
                dfd.reject(response.data);
            });

            return dfd.promise;
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                ngIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function (role) {
            if (ngIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }

        },

        authorizeAnyCurrentUserForRoute: function (roles) {
            for (var role = 0; role < roles.length; role++){
                if (ngIdentity.isAuthorized(roles[role]))
                    return true;
            }

            return $q.reject('not authorized');
        },

        authorizeAuthenticatedUserForRoute: function () {
            if (ngIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});

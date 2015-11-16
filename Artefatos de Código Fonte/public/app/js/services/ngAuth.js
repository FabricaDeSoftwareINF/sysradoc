angular.module('app').factory('ngAuth', function ($http, $location, ngIdentity, $q, ngUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new ngUser();
                    delete response.data.user.salt;
                    delete response.data.user.hashedPwd;
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

            $http.post('/create', newUser.$save()).then(function () {
                ngIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updateUser: function (userNewData) {
            var newUserInfo = new ngUser(userNewData);
            var dfd = $q.defer();

            $http.post('/update', newUserInfo.$save()).then(function () {
                ngIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
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

        authorizeAuthenticatedUserForRoute: function () {
            if (ngIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});

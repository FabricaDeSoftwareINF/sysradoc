angular.module('app').factory('ngUser', function ($resource) {
    var UserResource = $resource('/api/users/:id/:email/:token/:category', {id: "@id", email: "@email", token: "@token", category: "@category"}, {
        update: {method: 'PUT', isArray: false}
    });

    return UserResource;
});

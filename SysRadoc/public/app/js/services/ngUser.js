angular.module('app').factory('ngUser', function ($resource) {
    var UserResource = $resource('/api/users/:id/:email/:token', {_id: "@id", email: "@email", token: "@token"}, {
        update: {method: 'PUT', isArray: false}
    });

    return UserResource;
});
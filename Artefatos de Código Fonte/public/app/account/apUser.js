angular.module('app').factory('apUser', function ($resource) {
    var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return UserResource;
});

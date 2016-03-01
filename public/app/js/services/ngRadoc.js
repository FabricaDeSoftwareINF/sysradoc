angular.module('app').factory('ngRadoc', function ($resource) {
    var UserResource = $resource('/api/radoc/:id/', {id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return UserResource;
});

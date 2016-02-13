angular.module('app').factory('ngRequest', function ($resource) {
    var RequestResource = $resource('/api/request/:id', {id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return RequestResource;
});

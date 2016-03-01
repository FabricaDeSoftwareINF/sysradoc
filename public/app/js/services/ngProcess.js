angular.module('app').factory('ngProcess', function ($resource) {
    var ProcessResource = $resource('/api/process/:id', {id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return ProcessResource;
});

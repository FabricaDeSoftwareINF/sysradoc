angular.module('app').factory('ngProcess', function ($resource) {
    var ProcessResource = $resource('/api/processes/', {}, {
        update: {method: 'PUT', isArray: false}
    });

    return ProcessResource;
});

angular.module('app').factory('ngProcess', function ($resource) {
    var ProcessResource = $resource('/api/process/', {}, {
        update: {method: 'PUT', isArray: false}
    });

    return ProcessResource;
});

angular.module('app').factory('ngProcess', function ($resource) {
    var ProcessResource = $resource('/api/process/:idAvaliador', {idAvaliador: "@idAvaliador"}, {
        update: {method: 'PUT', isArray: false}
    });

    return ProcessResource;
});

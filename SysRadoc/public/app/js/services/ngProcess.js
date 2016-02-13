angular.module('app').factory('ngProcess', function ($resource) {
    var ProcessResource = $resource('/api/process/:idAvaliador/:id', {idAvaliador: "@idAvaliador", id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return ProcessResource;
});

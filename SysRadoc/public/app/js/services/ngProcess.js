angular.module('app').factory('ngProcess', function ($resource) {
    var ProcessResource = $resource('/api/processes/:id/:tipo/:situacao', {id: "@id", email: "@tipo", token: "@situacao"}, {
        update: {method: 'PUT', isArray: false}
    });

    return ProcessResource;
});

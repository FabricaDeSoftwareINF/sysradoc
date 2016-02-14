angular.module('app').factory('ngRadocSvc', function ($q, ngRadoc) {
    return {

        getAllRadocs: function(){
            return ngRadoc.query();
        },

        getRadocsByUser: function(id){
            return ngRadoc.query({id: id});
        },
    };
});

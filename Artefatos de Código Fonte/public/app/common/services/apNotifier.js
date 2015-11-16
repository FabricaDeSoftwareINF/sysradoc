angular.module('app').value('apToastr', toastr);

angular.module('app').factory('apNotifier', function (apToastr) {
    return {
        notify: function (msg, param) {
            apToastr.success(msg);
            console.log(msg, param);
        },

        error: function (msg, param) {
            apToastr.error(msg);
            console.log(msg);
        }
    };
});

angular.module('app').controller('apSignupCtrl', function ($scope) {
    $scope.data = {
        signup: {
            name: "",
            class: "-1",
            email: "",
            password: ""
        }
    };
});

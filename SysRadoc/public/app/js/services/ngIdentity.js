angular.module('app').factory('ngIdentity', function ($window, ngUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new ngUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.papeis.indexOf(role) > -1;
        },
        isGrantedAccess: function(level){
            return level === this.getAccessLevel();
        },
        getAccessLevel: function(){
            if (!this.currentUser)
                return null;

            var accessLevel = this.currentUser._categoria;
            if (!accessLevel)
                accessLevel = "Administrador";

            return accessLevel;
        }
    };
});

var UserRoleService = (function () {
    function UserRoleService($http, $window, iLocalStorageService) {
        this.iHttpService = $http;
        this.iWindowService = $window;
        this.iLocalStorageService = iLocalStorageService;
    }
    UserRoleService.prototype.CheckUser = function (name, url) {
        var self = this;
        self.currentUser = this.iLocalStorageService.GetCurrentUser();
        var config = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        };
        this.iHttpService.get('api/User/GetRole', config).then(function (response) {
            self.currentUser.role = response.data.Roles;
            if (self.currentUser.role.indexOf(name) == -1) {
                self.iWindowService.location.href = url;
            }
        }).catch(function (response) {
        });
    };
    return UserRoleService;
}());
//# sourceMappingURL=userrole.service.js.map
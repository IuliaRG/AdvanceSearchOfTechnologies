var UsersManagerController = (function () {
    function UsersManagerController(iDataService, $window, $http) {
        this._httpService = $http;
        this._iDataService = iDataService;
    }
    return UsersManagerController;
}());
var UserManagerDto = (function () {
    function UserManagerDto(email, password) {
        this.username = email;
        this.password = password;
    }
    return UserManagerDto;
}());
//# sourceMappingURL=usersmanager.controller.js.map
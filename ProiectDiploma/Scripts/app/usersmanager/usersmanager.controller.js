var UsersManagerController = (function () {
    function UsersManagerController($window, $http) {
        this.UsersManagerVM = new UsersManagerModel();
        this.HttpService = $http;
    }
    return UsersManagerController;
}());
var UsersManagerModel = (function () {
    function UsersManagerModel() {
        this.drones = new Array();
    }
    return UsersManagerModel;
}());
var UserManagerDto = (function () {
    function UserManagerDto(email, password) {
        this.username = email;
        this.password = password;
    }
    return UserManagerDto;
}());
//# sourceMappingURL=usersmanager.controller.js.map
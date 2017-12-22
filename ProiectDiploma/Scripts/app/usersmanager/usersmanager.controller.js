var UsersManagerController = (function () {
    function UsersManagerController(iDataService, $window, $http) {
        this._httpService = $http;
        this._iDataService = iDataService;
        this.UsersManagerVM = new UsersManagerModel();
        this._iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
    }
    UsersManagerController.prototype.GetUsersCallback = function (users, self) {
        self.UsersManagerVM.users = users;
    };
    return UsersManagerController;
}());
var UsersManagerModel = (function () {
    function UsersManagerModel() {
        this.users = new Array();
    }
    return UsersManagerModel;
}());
var UserDto = (function () {
    function UserDto() {
    }
    return UserDto;
}());
var UserDetailsDto = (function () {
    function UserDetailsDto() {
    }
    return UserDetailsDto;
}());
//# sourceMappingURL=usersmanager.controller.js.map
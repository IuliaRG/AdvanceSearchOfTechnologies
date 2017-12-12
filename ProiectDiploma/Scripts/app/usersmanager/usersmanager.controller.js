var UsersManagerController = (function () {
    // public Users: Array<UserModel>;
    function UsersManagerController(iDataService, $window, $http) {
        console.log("sjfd");
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
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
//# sourceMappingURL=usersmanager.controller.js.map
var UserDetailsController = (function () {
    function UserDetailsController(iLocalStorageService, iUserService, $window, $routeParams, $http, iUserRoleService) {
        this.iUserService = iUserService;
        this.route = $routeParams;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.iUserService = iUserService;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        this.UserDetailsVM = new UserModel();
        this.iUserService.GetUser("api/User/GetUserWithRoleById?id=" + this.route.id, this, this.GetUsersCallback);
    }
    UserDetailsController.prototype.GetUsersCallback = function (user, self) {
        self.UserDetailsVM.FromUserDto(user);
    };
    UserDetailsController.prototype.EditUser = function () {
        var self = this;
        var userDto = {
            "UserName": self.UserDetailsVM.UserName,
            "Email": self.UserDetailsVM.Email,
            "UserDetailsDto": {
                "FirstName": self.UserDetailsVM.FirstName,
                "LastName": self.UserDetailsVM.LastName,
                "Address": self.UserDetailsVM.Address,
            }
        };
        var config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        };
        self.iUserService.UpdateUserByAdmin('api/UserManager/EditUser?RoleName=', self.UserDetailsVM.Role, config, userDto, this);
        self.iWindowService.location.href = '/index.html#!/usersmanager';
    };
    return UserDetailsController;
}());
var UserModel = (function () {
    function UserModel() {
    }
    UserModel.prototype.FromUserDto = function (dto) {
        this.Id = dto.Id;
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.UserName = dto.UserName;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.Roles = dto.Roles;
        return this;
    };
    return UserModel;
}());
var UserDetailsDto = (function () {
    function UserDetailsDto() {
    }
    return UserDetailsDto;
}());
var UserDto = (function () {
    function UserDto() {
    }
    return UserDto;
}());
//# sourceMappingURL=userdetails.controller.js.map
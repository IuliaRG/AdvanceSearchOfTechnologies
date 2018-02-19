var UserDetailsController = (function () {
    function UserDetailsController(iDataService, $window, $routeParams, $http) {
        this.iDataService = iDataService;
        this.route = $routeParams;
        this.iWindowService = $window;
        this.UserDetailsVM = new UserModel();
        this.iDataService.Get("api/User?id=" + this.route.id, this, this.GetUsersCallback);
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
                "Address": self.UserDetailsVM.Address
            }
        };
        self.iDataService.Post('api/User/AddOrUpdate', userDto, this);
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
        this.LastName = dto.UserDetailsDto.LastName;
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
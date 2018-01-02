var UserDetailsController = (function () {
    function UserDetailsController(iDataService, $window, $routeParams, $http) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.route = $routeParams;
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
        this.iDataService.Post('api/User/AddOrUpdate', userDto, this);
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
    };
    return UserModel;
}());
//# sourceMappingURL=userdetails.controller.js.map
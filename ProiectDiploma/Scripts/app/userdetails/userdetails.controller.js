var UserDetailsController = (function () {
    function UserDetailsController(iDataService, $window, $routeParams, $http) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.route = $routeParams;
        this.UserDetailsVM = new UserDetailsModel();
        console.log(this.route.data);
        this.iDataService.Get("api/User?id=" + this.route.id, this, this.GetUsersCallback);
    }
    UserDetailsController.prototype.GetUsersCallback = function (user, self) {
        console.log(user);
        self.UserDetailsVM.FromUserDto(user);
    };
    return UserDetailsController;
}());
var UserDetailsModel = (function () {
    function UserDetailsModel() {
    }
    UserDetailsModel.prototype.FromUserDto = function (dto) {
        this.Id = dto.Id;
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.UserName = dto.UserName;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
    };
    return UserDetailsModel;
}());
//# sourceMappingURL=userdetails.controller.js.map
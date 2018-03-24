var CurrentUserDetailsController = (function () {
    function CurrentUserDetailsController(iLocalStorageService, iUserService, $window, $http) {
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.iLocalStorageService = iLocalStorageService;
        this.CurrentUserDetailsVM = new CurrentUserDetailsModel();
        this.currentUser = this.iLocalStorageService.GetCurrentUser();
        var config = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        };
        debugger;
        this.iUserService.GetCurrentUser("api/User/CurrentUser", config, this, this.GetUsersCallback);
    }
    CurrentUserDetailsController.prototype.GetUsersCallback = function (user, self) {
        self.CurrentUserDetailsVM.FromCurrentUserDto(user);
    };
    CurrentUserDetailsController.prototype.EditCurrentUser = function () {
        var self = this;
        var userDto = {
            "Email": self.CurrentUserDetailsVM.Email,
            "UserDetailsDto": {
                "FirstName": self.CurrentUserDetailsVM.FirstName,
                "LastName": self.CurrentUserDetailsVM.LastName,
                "Address": self.CurrentUserDetailsVM.Address
            }
        };
        self.iUserService.UserUpdate('api/User/AddOrUpdate', userDto, this);
        self.iWindowService.location.href = '/index.html#!/home';
    };
    return CurrentUserDetailsController;
}());
var CurrentUserDetailsModel = (function () {
    function CurrentUserDetailsModel() {
    }
    CurrentUserDetailsModel.prototype.FromCurrentUserDto = function (dto) {
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
        return this;
    };
    return CurrentUserDetailsModel;
}());
//# sourceMappingURL=currentuserdetails.controller.js.map
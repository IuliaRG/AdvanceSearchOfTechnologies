var LogInController = (function () {
    function LogInController(iLocalStorageService, iAccountService, iUserService, $window, $http) {
        this.iAccountService = iAccountService;
        this.iLocalStorageService = iLocalStorageService;
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.httpService = $http;
        this.LoginVM = new LogInModel();
        this.CurrentUserVM = new CurrentUserModel();
    }
    LogInController.prototype.LogIn = function () {
        var self = this;
        self.LoginVM.ShowError = false;
        if (self.LoginVM.Email == null) {
            self.LoginVM.ErrorMessage = "Your Email field cannot be blank!";
            self.LoginVM.ShowError = true;
            return;
        }
        if (self.validateEmail(self.LoginVM.Email) == false) {
            self.LoginVM.ErrorMessage = "Email address is not valid!";
            self.LoginVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.LoginVM.Password) == false) {
            self.LoginVM.ErrorMessage = "Password is not valid!";
            self.LoginVM.ShowError = true;
            return;
        }
        console.log(self.LoginVM.Email);
        var dto = new LogInDto(this.LoginVM.Email, this.LoginVM.Password);
        var tokenRequest = {
            method: 'POST',
            url: '/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'grant_type=password' + '&' + 'username=' + this.LoginVM.Email + '&' + 'password=' + this.LoginVM.Password
        };
        self.iAccountService.LogIn(tokenRequest, self, this.GetUsersCallback);
    };
    LogInController.prototype.GetUsersCallback = function (data, self) {
        self.CurrentUserVM.token = data.access_token;
        self.CurrentUserVM.email = data.userName;
        self.CurrentUserVM.tokenType = data.token_type;
        var userJson = JSON.stringify(self.CurrentUserVM);
        self.iLocalStorageService.SetCurrentUser("currentUser", userJson);
        var config = {
            headers: {
                "Authorization": 'Bearer ' + data.access_token,
            }
        };
        self.iUserService.GetUserRole('api/User/GetRole', config, self, self.GetUserRoleCallback);
    };
    LogInController.prototype.GetUserRoleCallback = function (user, self) {
        self.CurrentUserVM.role = user.Roles;
        if (self.CurrentUserVM.role.indexOf("Admin") > -1) {
            self.iWindowService.location.href = '/index.html#!/usersmanager';
        }
        else {
            self.iWindowService.location.href = '/index.html#!/home';
        }
    };
    LogInController.prototype.ErrorCallback = function (error) {
        var response = JSON.parse(error.responseText);
        var self = this;
        self.LoginVM.ErrorMessage = response.Message;
        self.LoginVM.ShowError = true;
    };
    LogInController.prototype.validateEmail = function (email) {
        var emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailValidation.test(email);
    };
    LogInController.prototype.validatePassword = function (password) {
        var passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        ;
        return passwordValidation.test(password);
    };
    return LogInController;
}());
var LogInModel = (function () {
    function LogInModel() {
    }
    return LogInModel;
}());
var LogInDto = (function () {
    function LogInDto(email, password) {
        this.grant_type = 'password';
        this.username = email;
        this.password = password;
    }
    return LogInDto;
}());
//# sourceMappingURL=login.controller.js.map
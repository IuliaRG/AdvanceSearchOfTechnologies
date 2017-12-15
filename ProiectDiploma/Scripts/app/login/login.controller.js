var LogInController = (function () {
    function LogInController(iDataService, $window, $http) {
        this._iDataService = iDataService;
        this.LoginVM = new LogInModel();
    }
    LogInController.prototype.PostUsersCallback = function (users, self) {
        var user = new UserLogInModel();
        user.token = users.access_token;
        user.email = users.userName;
        user.tokenType = users.token_type;
    };
    LogInController.prototype.ErrorCallback = function (error) {
        var response = JSON.parse(error.responseText);
        var self = this;
        self.LoginVM.ErrorMessage = response.Message;
        self.LoginVM.ShowError = true;
    };
    LogInController.prototype.LoginClick = function () {
        var self = this;
        var dto = new LogInDto(this.LoginVM.Email, this.LoginVM.Password);
        var data = JSON.stringify(dto);
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
        this._iDataService.Post("/token", this.data, this, this.PostUsersCallback);
    };
    LogInController.prototype.validateEmail = function (email) {
        var emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailValidation.test(email);
    };
    LogInController.prototype.validatePassword = function (password) {
        var passwordValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return passwordValidation.test(password);
    };
    return LogInController;
}());
var UserLogInModel = (function () {
    function UserLogInModel() {
    }
    return UserLogInModel;
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
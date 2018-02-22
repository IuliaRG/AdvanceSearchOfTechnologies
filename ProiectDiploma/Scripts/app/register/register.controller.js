var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RegisterController = (function (_super) {
    __extends(RegisterController, _super);
    function RegisterController(iLocalStorageService, iAccountService, iUserService, $window, $routeParams, $http) {
        var _this = _super.call(this, iLocalStorageService, iAccountService, iUserService, $window, $http) || this;
        _this.httpService = $http;
        _this.RegisterVM = new RegisterModel();
        return _this;
    }
    RegisterController.prototype.UserRegister = function () {
        var self = this;
        self.RegisterVM.ShowError = false;
        if (self.RegisterVM.Email == null) {
            self.RegisterVM.ErrorMessage = "Your Email field cannot be blank!";
            self.RegisterVM.ShowError = true;
            return;
        }
        if (self.RegisterVM.Password !== self.RegisterVM.ConfirmPassword) {
            self.RegisterVM.ErrorMessage = "The password must be the same!";
            self.RegisterVM.ShowError = true;
            return;
        }
        if (self.validateEmail(self.RegisterVM.Email) !== true) {
            self.RegisterVM.ErrorMessage = "Email address is not valid!";
            self.RegisterVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.RegisterVM.Password) !== true) {
            self.RegisterVM.ErrorMessage = "Password is not valid!";
            self.RegisterVM.ShowError = true;
            return;
        }
        var config = {
            headers: {
                "contentType": "application/json"
            }
        };
        var userDto = {
            "Email": self.RegisterVM.Email,
            "Password": self.RegisterVM.Password,
            "ConfirmPassword": self.RegisterVM.ConfirmPassword
        };
        self.iAccountService.UserRegister('api/Account/Register', config, userDto, this, this.SuccessCallback, this.ErrorCallback);
    };
    RegisterController.prototype.SuccessCallback = function (user, self) {
        self.RegisterVM.ErrorMessage = "Your has been successfully register.Plese check your email address and confirm your email";
        self.RegisterVM.ShowError = true;
    };
    return RegisterController;
}(LogInController));
var RegisterModel = (function () {
    function RegisterModel() {
    }
    return RegisterModel;
}());
//# sourceMappingURL=register.controller.js.map
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
var ForgotPasswordController = (function (_super) {
    __extends(ForgotPasswordController, _super);
    function ForgotPasswordController(iLocalStorageService, iAccountService, iUserService, $window, $routeParams, $http) {
        var _this = _super.call(this, iLocalStorageService, iAccountService, iUserService, $window, $http) || this;
        _this.httpService = $http;
        _this.route = $routeParams;
        _this.ForgotPassworVM = new ForgotPasswordModel();
        return _this;
    }
    ForgotPasswordController.prototype.SendLinkForPassword = function () {
        var self = this;
        self.ForgotPassworVM.ShowError = false;
        if (self.ForgotPassworVM.Email == null) {
            self.ForgotPassworVM.ErrorMessage = "Your Email field cannot be blank!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }
        if (self.validateEmail(self.ForgotPassworVM.Email) !== true) {
            self.ForgotPassworVM.ErrorMessage = "Email address is not valid!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }
        var config = {
            headers: {
                "contentType": "application/json"
            }
        };
        var userDto = {
            "Email": self.ForgotPassworVM.Email
        };
        self.iAccountService.ForgotPassword('api/Account/ForgotPassword', config, userDto, this, this.SuccessCallback);
    };
    ForgotPasswordController.prototype.SuccessCallback = function (user, self) {
        self.ForgotPassworVM.ErrorMessage = "Check your email address!";
        self.ForgotPassworVM.ShowError = true;
    };
    return ForgotPasswordController;
}(LogInController));
var ForgotPasswordModel = (function () {
    function ForgotPasswordModel() {
    }
    return ForgotPasswordModel;
}());
//# sourceMappingURL=forgotpassword.controller.js.map
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
    function ForgotPasswordController(iDataService, $window, $routeParams, $http) {
        var _this = _super.call(this, iDataService, $window) || this;
        _this.httpService = $http;
        _this.route = $routeParams;
        _this.ForgotPassworVM = new ForgotPasswordModel();
        _this.ForgotPassworVM.Email = _this.route.username;
        return _this;
        // this.iDataService.Get("api/User?id=" + this.route.id, this, this.GetUsersCallback);
    }
    ForgotPasswordController.prototype.ResetPasswordClick = function () {
        var self = this;
        self.ForgotPassworVM.ShowError = false;
        if (self.ForgotPassworVM.Email == null) {
            self.ForgotPassworVM.ErrorMessage = "Your Email field cannot be blank!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }
        if (self.ForgotPassworVM.NewPassword !== self.ForgotPassworVM.ConfirmPassword) {
            self.ForgotPassworVM.ErrorMessage = "The password must be the same!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }
        if (self.validateEmail(self.ForgotPassworVM.Email) !== true) {
            self.ForgotPassworVM.ErrorMessage = "Email address is not valid!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.ForgotPassworVM.NewPassword) !== true) {
            self.ForgotPassworVM.ErrorMessage = "Password is not valid!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }
        var config = {
            headers: {
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        this.httpService.post('api/Account/ResetPassword', {
            "Email": self.route.username,
            "NewPassword": self.ForgotPassworVM.NewPassword,
            "ConfirmPassword": self.ForgotPassworVM.ConfirmPassword,
        }).then(function (response) {
            self.iWindowService.location.href = '/index.html#!/login';
            self.ForgotPassworVM.ErrorMessage = "Your password has been successfully reset";
        }).catch(function (response) {
            self.ForgotPassworVM.ErrorMessage = response.data.Message;
        });
    };
    return ForgotPasswordController;
}(LogInController));
var ForgotPasswordModel = (function () {
    function ForgotPasswordModel() {
    }
    return ForgotPasswordModel;
}());
//# sourceMappingURL=forgotpassword.controller.js.map
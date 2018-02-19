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
var ResetPasswordController = (function (_super) {
    __extends(ResetPasswordController, _super);
    function ResetPasswordController(iLocalStorageService, iDataService, $window, $routeParams, $http) {
        var _this = _super.call(this, iLocalStorageService, iDataService, $window, $http) || this;
        _this.route = $routeParams;
        _this.httpService = $http;
        _this.ResetPassworVM = new ResetPasswordModel();
        _this.ResetPassworVM.Email = _this.route.username;
        return _this;
    }
    ResetPasswordController.prototype.ResetPassword = function () {
        var self = this;
        self.ResetPassworVM.ShowError = false;
        if (self.ResetPassworVM.Email == null) {
            self.ResetPassworVM.ErrorMessage = "Your Email field cannot be blank!";
            self.ResetPassworVM.ShowError = true;
            return;
        }
        if (self.ResetPassworVM.NewPassword !== self.ResetPassworVM.ConfirmPassword) {
            self.ResetPassworVM.ErrorMessage = "The password must be the same!";
            self.ResetPassworVM.ShowError = true;
            return;
        }
        if (self.validateEmail(self.ResetPassworVM.Email) !== true) {
            self.ResetPassworVM.ErrorMessage = "Email address is not valid!";
            self.ResetPassworVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.ResetPassworVM.NewPassword) !== true) {
            self.ResetPassworVM.ErrorMessage = "Password is not valid!";
            self.ResetPassworVM.ShowError = true;
            return;
        }
        var config = {
            headers: {
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        self.httpService.post('api/Account/ResetPassword', {
            "Email": self.route.username,
            "NewPassword": self.ResetPassworVM.NewPassword,
            "ConfirmPassword": self.ResetPassworVM.ConfirmPassword,
        }).then(function (response) {
            self.iWindowService.location.href = '/index.html#!/login';
            self.ResetPassworVM.ErrorMessage = "Your password has been successfully reset";
        }).catch(function (response) {
            self.ResetPassworVM.ErrorMessage = response.data.Message;
        });
    };
    return ResetPasswordController;
}(LogInController));
var ResetPasswordModel = (function () {
    function ResetPasswordModel() {
    }
    return ResetPasswordModel;
}());
//# sourceMappingURL=resetpassword.controller.js.map
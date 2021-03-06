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
var ChangePasswordController = (function (_super) {
    __extends(ChangePasswordController, _super);
    function ChangePasswordController(iLocalStorageService, iAccountService, iUserService, $window, $routeParams, $http) {
        var _this = _super.call(this, iLocalStorageService, iAccountService, iUserService, $window, $http) || this;
        _this.iAccountService = null;
        _this.httpService = $http;
        _this.route = $routeParams;
        _this.ChangePassworVM = new ChangePasswordModel();
        return _this;
    }
    ChangePasswordController.prototype.ChangePasswordClick = function () {
        var self = this;
        self.ChangePassworVM.ShowError = false;
        if (self.ChangePassworVM.NewPassword !== self.ChangePassworVM.ConfirmPassword) {
            self.ChangePassworVM.ErrorMessage = "The password must be the same!";
            self.ChangePassworVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.ChangePassworVM.NewPassword) !== true) {
            self.ChangePassworVM.ErrorMessage = "Password is not valid!";
            self.ChangePassworVM.ShowError = true;
            return;
        }
        this.currentUser = this.iLocalStorageService.GetCurrentUser();
        var config = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        };
        this.httpService.post('api/Account/ChangePassword', {
            "OldPassword": self.ChangePassworVM.OldPassword,
            "NewPassword": self.ChangePassworVM.NewPassword,
            "ConfirmPassword": self.ChangePassworVM.ConfirmPassword,
        }, config).then(function (response) {
            self.ChangePassworVM.ErrorMessage = "Your password has been successfully change";
        }).catch(function (response) {
            self.ChangePassworVM.ErrorMessage = response.data.Message;
        });
    };
    return ChangePasswordController;
}(LogInController));
var ChangePasswordModel = (function () {
    function ChangePasswordModel() {
    }
    return ChangePasswordModel;
}());
//# sourceMappingURL=changepassword.controller.js.map
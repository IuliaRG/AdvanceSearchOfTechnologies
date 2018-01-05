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
    function ForgotPasswordController(iLocalStorageService, iDataService, $window, $routeParams, $http) {
        var _this = _super.call(this, iLocalStorageService, iDataService, $window, $http) || this;
        _this.httpService = $http;
        _this.route = $routeParams;
        _this.ForgotPassworVM = new ForgotPasswordModel();
        return _this;
    }
    ForgotPasswordController.prototype.SendLink = function () {
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
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        this.httpService.post('api/Account/ForgotPassword', {
            "Email": self.ForgotPassworVM.Email,
        }).then(function (response) {
            self.ForgotPassworVM.ErrorMessage = "Check your email address";
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
var AccountService = (function () {
    function AccountService($http, $window) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    AccountService.prototype.UserRegister = function (url, config, data, caller, successCallback, errorCallback) {
        this._iHttpService.post(url, data).then(function (response) {
            successCallback(response.data, caller);
        }).catch(function (err) {
            errorCallback(err);
        });
    };
    AccountService.prototype.ForgotPassword = function (url, config, data, caller, successCallback) {
        this._iHttpService.post(url, data).then(function (response) {
            successCallback(response.data, caller);
        }).catch(function (err) {
        });
    };
    AccountService.prototype.ResetPassword = function (url, config, data, caller, successCallback) {
        this._iHttpService.post(url, data).then(function (response) {
            successCallback(response.data, caller);
        }).catch(function (err) {
        });
    };
    AccountService.prototype.LogIn = function (data, caller, successCallback) {
        this._iHttpService(data).then(function (response) {
            console.log(response.data);
            successCallback(response.data, caller);
        }).catch(function (err) {
        });
    };
    return AccountService;
}());
//# sourceMappingURL=account.service.js.map
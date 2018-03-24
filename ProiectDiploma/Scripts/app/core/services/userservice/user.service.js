var UserService = (function () {
    function UserService($http, $window) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    UserService.prototype.GetUser = function (url, caller, successCallback) {
        this._iHttpService.get(url, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    UserService.prototype.GetCurrentUser = function (url, data, caller, successCallback) {
        this._iHttpService.get(url, data).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    UserService.prototype.GetUserRole = function (url, data, caller, successCallback) {
        this._iHttpService.get(url, data).then(function (response) {
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    UserService.prototype.GetPageItems = function (url, data, caller, successCallback) {
        this._iHttpService.post(url, data).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
        });
    };
    UserService.prototype.UserUpdate = function (url, data, caller) {
        this._iHttpService.post(url, data).then(function (response) {
        }).catch(function (err) {
        });
    };
    UserService.prototype.DeleteUser = function (url, id, caller, successCallback) {
        this._iHttpService.delete(url + id, {}).then(function (response) {
            console.log(response);
            successCallback(caller);
        }).catch(function (err) {
        });
    };
    return UserService;
}());
//# sourceMappingURL=user.service.js.map
var DataService = (function () {
    function DataService($http, $window) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    DataService.prototype.Get = function (url, caller, successCallback) {
        this._iHttpService.get(url, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    DataService.prototype.GetById = function (url, id, caller, successCallback) {
        this._iHttpService.get(url + id, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    DataService.prototype.PostCallback = function (url, data, caller, successCallback) {
        this._iHttpService.post(url, data).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
        });
    };
    DataService.prototype.Post = function (url, data, caller) {
        this._iHttpService.post(url, data).then(function (response) {
            console.log(response);
        }).catch(function (err) {
            //  errorCallback(err);
        });
    };
    DataService.prototype.LogIn = function (data, caller, successCallback) {
        this._iHttpService(data).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            //  errorCallback(err);
        });
    };
    DataService.prototype.Delete = function (url, id, caller, successCallback) {
        this._iHttpService.delete(url + id, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    return DataService;
}());
//# sourceMappingURL=data.service.js.map
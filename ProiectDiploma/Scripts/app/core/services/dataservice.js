var DataService = (function () {
    function DataService($http) {
        this._iHttpService = $http;
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
    DataService.prototype.Post = function (url, entity, caller, successCallback) {
        this._iHttpService.post(url, entity).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    DataService.prototype.Delete = function (url, id, caller, successCallback) {
        this._iHttpService.delete(url + id).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    return DataService;
}());
angular.
    module('core.data').
    service('IDataService', ['$http', DataService]);
//# sourceMappingURL=dataservice.js.map
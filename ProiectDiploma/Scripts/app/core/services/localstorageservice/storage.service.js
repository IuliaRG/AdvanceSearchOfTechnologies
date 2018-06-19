var LocalStorageService = (function () {
    function LocalStorageService($http, $window) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    LocalStorageService.prototype.SetCurrentUser = function (name, data) {
        this.currentUser = name;
        localStorage.setItem(name, data);
    };
    LocalStorageService.prototype.GetCurrentUser = function () {
        if (localStorage.currentUser != null) {
            return JSON.parse(localStorage.currentUser);
        }
    };
    LocalStorageService.prototype.LogOut = function (url) {
        var _this = this;
        localStorage.removeItem("currentUser");
        this._iHttpService.post(url, {}).then(function (response) {
            _this.iWindowService.location.href = '/index.html#!/home';
        }).catch(function (err) {
        });
    };
    return LocalStorageService;
}());
var CurrentUserModel = (function () {
    function CurrentUserModel() {
        this.role = new Array();
    }
    return CurrentUserModel;
}());
//# sourceMappingURL=storage.service.js.map
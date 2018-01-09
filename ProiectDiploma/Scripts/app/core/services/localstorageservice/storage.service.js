var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.SetCurrentUser = function (name, data) {
        localStorage.setItem(name, data);
    };
    LocalStorageService.prototype.GetCurrentUser = function () {
        return JSON.parse(localStorage.currentUser);
    };
    return LocalStorageService;
}());
var CurrentUserModel = (function () {
    function CurrentUserModel() {
    }
    return CurrentUserModel;
}());
//# sourceMappingURL=storage.service.js.map
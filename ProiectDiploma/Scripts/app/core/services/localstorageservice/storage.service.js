var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.SetCurrentUser = function (name, data) {
        localStorage.setItem(name, data);
        if (localStorage.getItem(name) != null) {
            localStorage.currentUser = JSON.parse(localStorage.getItem(name));
        }
    };
    return LocalStorageService;
}());
//# sourceMappingURL=storage.service.js.map
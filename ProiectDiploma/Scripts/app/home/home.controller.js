var HomeController = (function () {
    function HomeController($window) {
        this.HomeVM = new HomeModel();
    }
    return HomeController;
}());
var HomeModel = (function () {
    function HomeModel() {
        this.drones = new Array();
    }
    return HomeModel;
}());
//# sourceMappingURL=home.controller.js.map
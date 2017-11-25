class HomeController {
    public HomeVM: HomeModel;

    constructor($window: ng.IWindowService) {
        this.HomeVM = new HomeModel();
    }
}

class HomeModel {
    public drones: Array<any>;
    constructor() {
        this.drones = new Array<any>();
    }
}
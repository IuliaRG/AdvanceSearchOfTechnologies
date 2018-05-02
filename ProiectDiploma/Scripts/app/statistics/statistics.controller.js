var StatisticsController = (function () {
    function StatisticsController(iLocalStorageService, iUserRoleService, iProductService, $window, $http) {
        this.httpService = $http;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.iProductService = iProductService;
        this.ProductsDataVM = new ProductsDataModel();
        //   this.initialize();
        // this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.users = null;
        this.iProductService.GetAllBrands("api/Product/GetAllBrands", this, this.GetBrandsCallback);
    }
    StatisticsController.prototype.GetProducts = function (name) {
        this.iProductService.GetProductByBrand("api/Product/GetBrandProducts?brandName=", name, this, this.GetBrandsProductCallback);
    };
    StatisticsController.prototype.GetBrandsCallback = function (data, self) {
        self.ProductsDataVM.FromBrandsDto(data);
        console.log("code" + self.ProductsDataVM.Brand);
    };
    StatisticsController.prototype.GetBrandsProductCallback = function (data, self) {
        self.ProductsDataVM.FromProductsBrandDto(data);
        console.log("code" + self.ProductsDataVM.Products);
    };
    StatisticsController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        }, 1000);
    };
    StatisticsController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    return StatisticsController;
}());
var ProductsDataModel = (function () {
    function ProductsDataModel() {
        this.Brand = new Array();
        this.Products = new Array();
    }
    ProductsDataModel.prototype.FromBrandsDto = function (dto) {
        this.Brand = dto;
        return this;
    };
    ProductsDataModel.prototype.FromProductsBrandDto = function (dto) {
        this.Products = dto;
        return this;
    };
    return ProductsDataModel;
}());
//# sourceMappingURL=statistics.controller.js.map
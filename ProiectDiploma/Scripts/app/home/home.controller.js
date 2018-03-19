var HomeController = (function () {
    function HomeController(iProductService, $http) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new ProductPageModel();
        this.iProductService = iProductService;
        this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
    }
    HomeController.prototype.GetProductsCallback = function (data, self) {
        self.ProductVM.FromProductsDto(data);
        console.log(self.ProductVM.products);
    };
    HomeController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        }, 1000);
    };
    HomeController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    return HomeController;
}());
var ProductPageModel = (function () {
    function ProductPageModel() {
        this.products = new Array();
    }
    ProductPageModel.prototype.FromProductsDto = function (data) {
        this.products = data.map(function (dto) { return ((new ProductDetailsModel()).FromProductDto(dto)); });
        return this;
    };
    return ProductPageModel;
}());
//# sourceMappingURL=home.controller.js.map
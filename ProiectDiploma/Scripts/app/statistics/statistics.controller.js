var StatisticsController = (function () {
    function StatisticsController(iLocalStorageService, iUserRoleService, iProductService, $window, $scope, $http) {
        this.httpService = $http;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.iProductService = iProductService;
        this.ProductsDataVM = new ProductsDataModel();
        this.StatisticsVM = new ReviewStatisticsModel();
        this.initialize();
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.users = null;
        this.scope = $scope;
        this.iProductService.GetAllBrands("api/Product/GetAllBrands", this, this.GetBrandsCallback);
    }
    StatisticsController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            // self.loadScript('jquery.js');
            // self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
            // self.loadBoostrapScript('bootstrap.min.css');
            //self.loadCssScript('ng-google-chart.js');
        }, 1000);
    };
    StatisticsController.prototype.loadBoostrapScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/bootshop/' + path;
        head.appendChild(script);
    };
    StatisticsController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    StatisticsController.prototype.loadCssScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'Scripts/' + path;
        head.appendChild(script);
    };
    StatisticsController.prototype.GetProducts = function (name) {
        this.iProductService.GetProductByBrand("api/Product/GetBrandProducts?brandName=", name, this, this.GetBrandsProductCallback);
    };
    StatisticsController.prototype.GetBrandsCallback = function (data, self) {
        self.ProductsDataVM.FromBrandsDto(data);
    };
    StatisticsController.prototype.GetReviewStatisticsCallback = function (data, self) {
        self.StatisticsVM.FromReviewStatisticsDto(data);
        self.scope.myChartObject = {};
        self.scope.myChartObject.type = "PieChart";
        self.scope.myChartObject.data = {
            "cols": [
                { id: "t", label: "Statistics", type: "string" },
                { id: "s", label: "Slices", type: "number" }
            ], "rows": [
                {
                    c: [
                        { v: "Bad" },
                        { v: self.StatisticsVM.Bad },
                    ]
                },
                {
                    c: [
                        { v: "Medium" },
                        { v: self.StatisticsVM.Medium }
                    ]
                },
                {
                    c: [
                        { v: "Excellent" },
                        { v: self.StatisticsVM.Excellent },
                    ]
                }
            ]
        };
        self.scope.myChartObject.options = {
            'title': 'Statistics'
        };
        //   self.scope.myChartObjec.drawToolbar;
    };
    StatisticsController.prototype.GetBrandsProductCallback = function (data, self, brand) {
        var index = self.ProductsDataVM.Brand.map(function (brand) { return brand.Name; }).indexOf(brand);
        self.ProductsDataVM.Brand[index].Products = data;
        self.ProductsDataVM.Brand[index].Products.map(function (dto) { return ((new ProductModel()).FromProductDto(dto)); });
    };
    StatisticsController.prototype.CreatProductChart = function (id) {
        this.iProductService.GetProductByBrand("api/Review/GetProductReviewsStatistics?id=", id, this, this.GetReviewStatisticsCallback);
    };
    StatisticsController.prototype.CreatBrandChart = function (brand) {
        this.iProductService.GetProductByBrand("api/Review/GetBrandReviewsStatistics?brandName=", brand, this, this.GetReviewStatisticsCallback);
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
    return ProductsDataModel;
}());
var ProductModel = (function () {
    function ProductModel() {
    }
    ProductModel.prototype.FromProductDto = function (dto) {
        this.Id = dto.Id;
        this.Name = dto.Name;
        return this;
    };
    return ProductModel;
}());
var ReviewStatisticsModel = (function () {
    function ReviewStatisticsModel() {
    }
    ReviewStatisticsModel.prototype.FromReviewStatisticsDto = function (dto) {
        this.Bad = dto.Bad;
        this.Medium = dto.Medium;
        this.Excellent = dto.Excellent;
        return this;
    };
    return ReviewStatisticsModel;
}());
//# sourceMappingURL=statistics.controller.js.map
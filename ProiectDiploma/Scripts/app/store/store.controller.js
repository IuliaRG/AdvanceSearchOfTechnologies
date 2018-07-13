var StoreController = (function () {
    function StoreController($scope, iLocalStorageService, iProductService, $http, $window) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new StorePageModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.iWindowService = $window;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        // this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
        this.Discussion = [];
        this.scope = $scope;
        this.ProductPagination();
    }
    StoreController.prototype.GetProductsCallback = function (data, self) {
        self.ProductVM.FromProductsDto(data);
        console.log("current page " + self.ProductVM.CurrentPage);
        self.loadBootstrap();
    };
    StoreController.prototype.LogOut = function () {
        this.iLocalStorageService.LogOut(' api/Account/Logout');
        //this.iWindowService.location.href = '/index.html#!/home';
    };
    StoreController.prototype.ProductPagination = function (itemsNumber, pageNumber, category, brand) {
        var self = this;
        self.ProductVM.ItemsOnPage = itemsNumber;
        self.ProductVM.PageNumber = pageNumber;
        self.ProductVM.Brand = brand;
        self.ProductVM.Category = category;
        var pageDto = {
            "PageNumber": self.ProductVM.PageNumber,
            "ItemsOnPage": self.ProductVM.ItemsOnPage,
            "SortDirection": self.ProductVM.SortDirection,
            "SortField": self.ProductVM.SortField,
            "CurrentPage": self.ProductVM.CurrentPage,
            "Brand": self.ProductVM.Brand,
            "Category": self.ProductVM.Category,
        };
        self.iProductService.GetPageProducts('api/Product/ProductPage', pageDto, this, this.GetProductsCallback);
    };
    StoreController.prototype.loadBootstrap = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        });
    };
    StoreController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.js');
            //self.loadBoostrapScript('bootstrap.min.css');
            self.loadCssScript('base.css');
        }, 1000);
    };
    StoreController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    StoreController.prototype.loadBoostrapScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/bootshop/' + path;
        head.appendChild(script);
    };
    StoreController.prototype.loadCssScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/css/' + path;
        head.appendChild(script);
    };
    return StoreController;
}());
var StorePageModel = (function () {
    function StorePageModel() {
        this.products = new Array();
        this.meniu = new Array();
    }
    StorePageModel.prototype.FromProductsDto = function (data) {
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.LastPage = data.LastPage;
        this.SortField = data.SortField;
        this.Image = data.Image;
        this.meniu = data.Meniu.map(function (dto) { return ((new StoreMeniuModel()).FromMeniuDto(dto)); });
        this.products = data.Data.map(function (dto) { return ((new ProductDetailsModel()).FromProductDto(dto)); });
        return this;
    };
    return StorePageModel;
}());
var StoreMeniuModel = (function () {
    function StoreMeniuModel() {
        this.Brands = new Array();
    }
    StoreMeniuModel.prototype.FromMeniuDto = function (dto) {
        this.Category = dto.Category;
        this.Brands = dto.Brands;
        return this;
    };
    return StoreMeniuModel;
}());
//# sourceMappingURL=store.controller.js.map
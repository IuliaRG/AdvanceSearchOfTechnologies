var HomeController = (function () {
    function HomeController($scope, iLocalStorageService, iProductService, $http, $window, $routeParams) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new ProductPageModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.iWindowService = $window;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        this.route = $routeParams;
        this.PopularProductVM = new PopularProductModel();
        // this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
        this.Discussion = [];
        this.scope = $scope;
        this.ProductPagination(null, null, this.route.category, this.route.brand);
        this.GetPopularProducts();
    }
    HomeController.prototype.GetProductsCallback = function (data, self) {
        self.ProductVM.FromProductsDto(data);
        console.log(self.ProductVM.CurrentPage);
        self.loadBootstrap();
    };
    HomeController.prototype.GetPopularProductsCallback = function (data, self) {
        self.PopularProductVM.FromProductsDto(data);
        console.log(self.PopularProductVM.Name);
    };
    HomeController.prototype.GetPopularProducts = function () {
        var self = this;
        self.iProductService.GetPopularProducts('api/Product/GetPopularProducts', this, this.GetPopularProductsCallback);
    };
    HomeController.prototype.LogOut = function () {
        this.iLocalStorageService.LogOut(' api/Account/Logout');
        //this.iWindowService.location.href = '/index.html#!/home';
    };
    HomeController.prototype.ProductPagination = function (itemsNumber, pageNumber, category, brand) {
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
    HomeController.prototype.loadBootstrap = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        });
    };
    HomeController.prototype.initialize = function () {
        var _this = this;
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.js');
            //self.loadBoostrapScript('bootstrap.min.css');
            self.loadCssScript('base.css');
            console.log(0);
            $(function () {
                self.chat = $.connection.chatHub;
                _this.chat.client.receiveFromAdmin = function (from, message) { self.ReceiveFromAdmin(from, message, self); };
                $('#message').focus();
                $.connection.hub.start().done(function () {
                    self.id = _this.chat.connection.id;
                    self.chat.server.register(_this.id);
                });
            });
        }, 1000);
    };
    HomeController.prototype.SendMessage = function () {
        this.Discussion.push(this.Message);
        this.chat.server.sendToAdmin(this.Message, this.id);
        this.Message = " ";
    };
    HomeController.prototype.ReceiveFromAdmin = function (from, message, self) {
        self.Discussion.push('Message from' + ' ' + from + ':' + ' ' + message);
        self.scope.$apply();
    };
    HomeController.prototype.loadHub = function () {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'signalr/hubs';
        head.appendChild(script);
    };
    HomeController.prototype.loadChatScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'Scripts/' + path;
        head.appendChild(script);
    };
    HomeController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    HomeController.prototype.loadBoostrapScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/bootshop/' + path;
        head.appendChild(script);
    };
    HomeController.prototype.loadCssScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/css/' + path;
        head.appendChild(script);
    };
    return HomeController;
}());
var PopularProductModel = (function () {
    function PopularProductModel() {
        this.popularProducts = new Array();
    }
    PopularProductModel.prototype.FromProductsDto = function (data) {
        this.popularProducts = data.map(function (dto) { return ((new ProductDetailsModel()).FromProductDto(dto)); });
        return this;
    };
    return PopularProductModel;
}());
var ProductPageModel = (function () {
    function ProductPageModel() {
        this.products = new Array();
        this.meniu = new Array();
    }
    ProductPageModel.prototype.FromProductsDto = function (data) {
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.LastPage = data.LastPage;
        this.SortField = data.SortField;
        this.Image = data.Image;
        this.meniu = data.Meniu.map(function (dto) { return ((new MeniuModel()).FromMeniuDto(dto)); });
        this.products = data.Data.map(function (dto) { return ((new ProductDetailsModel()).FromProductDto(dto)); });
        return this;
    };
    return ProductPageModel;
}());
var MeniuModel = (function () {
    function MeniuModel() {
        this.Brands = new Array();
    }
    MeniuModel.prototype.FromMeniuDto = function (dto) {
        this.Category = dto.Category;
        this.Brands = dto.Brands;
        return this;
    };
    return MeniuModel;
}());
//# sourceMappingURL=home.controller.js.map
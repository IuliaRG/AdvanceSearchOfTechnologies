var HomeController = (function () {
    function HomeController($scope, iLocalStorageService, iProductService, $http) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new ProductPageModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        console.log(this.currentUser.email);
        this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
        this.Discussion = [];
        this.scope = $scope;
    }
    HomeController.prototype.GetProductsCallback = function (data, self) {
        self.ProductVM.FromProductsDto(data);
        console.log(self.ProductVM.products);
    };
    HomeController.prototype.initialize = function () {
        var _this = this;
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
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
        }, 1200);
    };
    HomeController.prototype.SendMessage = function () {
        this.myHub = $;
        this.chat = this.myHub.connection.chatHub;
        debugger;
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
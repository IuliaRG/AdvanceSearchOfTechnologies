var ProductDetailsController = (function () {
    function ProductDetailsController(iProductService, $http, $routeParams) {
        this.initialize();
        this._httpService = $http;
        this.ProductDetailsVM = new ProductDetailsModel();
        this.iProductService = iProductService;
        this.route = $routeParams;
        this.iProductService.GetProduct("api/Product/GetProductByID?id=" + this.route.id, this, this.GetProductCallback);
    }
    ProductDetailsController.prototype.GetProductCallback = function (data, self) {
        self.ProductDetailsVM.FromProductDto(data);
        console.log("code" + self.ProductDetailsVM.Code);
    };
    ProductDetailsController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        }, 1000);
    };
    ProductDetailsController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    return ProductDetailsController;
}());
var ProductDetailsModel = (function () {
    function ProductDetailsModel() {
    }
    ProductDetailsModel.prototype.FromProductDto = function (dto) {
        this.Id = dto.Id;
        this.Name = dto.Name;
        this.Description = dto.Description;
        this.Price = dto.Price;
        this.Code = dto.Code;
        this.ShortDescription = dto.ShortDescription;
        this.Brand = dto.Brand;
        this.ReleaseDate = dto.ReleaseDate;
        this.Model = dto.Model;
        this.Dimensions = dto.Dimensions;
        return this;
    };
    return ProductDetailsModel;
}());
//# sourceMappingURL=productdetails.controller.js.map
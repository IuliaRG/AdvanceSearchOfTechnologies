var ProductDetailsController = (function () {
    function ProductDetailsController(iLocalStorageService, $window, iProductService, $http, $routeParams) {
        this.initialize();
        this._httpService = $http;
        this.iWindowService = $window;
        this.ProductDetailsVM = new ProductDetailsModel();
        this.ProducReviewVM = new ProducReviewModel();
        this.iProductService = iProductService;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        console.log(this.currentUser.email);
        this.route = $routeParams;
        this.iProductService.GetProduct("api/Product/GetProductByID?id=" + this.route.id, this, this.GetProductCallback);
    }
    ProductDetailsController.prototype.GetProductCallback = function (data, self) {
        self.ProductDetailsVM.FromProductDto(data);
        console.log("code" + self.ProductDetailsVM.Reviews);
    };
    ProductDetailsController.prototype.AddReview = function () {
        var self = this;
        var config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        };
        var userDto = {
            "Content": self.ProducReviewVM.Content,
            "ProductName": self.ProductDetailsVM.Id,
        };
        self.iProductService.AddOrUpdateReview('api/Review/AddOrUpdate', config, userDto, this);
        self.iWindowService.location.href = '/index.html#!/home';
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
var ProducReviewModel = (function () {
    function ProducReviewModel() {
    }
    ProducReviewModel.prototype.FromProductReviewDto = function (dto) {
        this.Content = dto.Content;
        return this;
    };
    return ProducReviewModel;
}());
var ProductDetailsModel = (function () {
    function ProductDetailsModel() {
        this.Reviews = new Array();
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
        this.Reviews = dto.Reviews.map(function (data) { return ((new ProducReviewModel()).FromProductReviewDto(data)); });
        return this;
    };
    return ProductDetailsModel;
}());
//# sourceMappingURL=productdetails.controller.js.map
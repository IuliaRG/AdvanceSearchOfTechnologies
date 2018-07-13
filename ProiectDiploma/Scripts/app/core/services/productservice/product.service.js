var ProductService = (function () {
    function ProductService($http, $window) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    ProductService.prototype.GetProduct = function (url, caller, successCallback) {
        this._iHttpService.get(url, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ProductService.prototype.GetPopularProducts = function (url, caller, successCallback) {
        this._iHttpService.get(url, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ProductService.prototype.GetProductByBrand = function (url, brand, caller, successCallback) {
        this._iHttpService.get(url + brand, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller, brand);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ProductService.prototype.GetAllBrands = function (url, caller, successCallback) {
        this._iHttpService.get(url, {}).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ProductService.prototype.GetProductReviews = function (url, caller) {
        this._iHttpService.get(url, {}).then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ProductService.prototype.GetPageProducts = function (url, data, caller, successCallback) {
        this._iHttpService.post(url, data).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
        });
    };
    ProductService.prototype.GetProductPage = function (url, data, caller, successCallback) {
        this._iHttpService.post(url, data).then(function (response) {
            console.log(response);
            successCallback(response.data, caller);
        }).catch(function (err) {
        });
    };
    ProductService.prototype.AddOrUpdateProduct = function (url, data, caller) {
        this._iHttpService.post(url, data).then(function (response) {
        }).catch(function (err) {
        });
    };
    ProductService.prototype.AddOrUpdateReview = function (url, config, data, caller) {
        this._iHttpService.post(url, data, config)
            .then(function (response) {
            console.log(response);
        }).catch(function (err) {
        });
    };
    ProductService.prototype.DeleteProduct = function (url, id, caller, successCallback) {
        this._iHttpService.delete(url + id, {}).then(function (response) {
            console.log(response);
            successCallback(caller);
        }).catch(function (err) {
        });
    };
    return ProductService;
}());
//# sourceMappingURL=product.service.js.map
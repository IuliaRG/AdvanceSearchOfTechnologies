var AddProductController = (function () {
    function AddProductController(iLocalStorageService, iUserRoleService, iproductService, $window, $http) {
        this.httpService = $http;
        this.iproductService = iproductService;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.NewProductVM = new ProductDetailsModel();
        this.iUserRoleService.CheckUser("Admin", "addproduct");
        this.users = null;
    }
    AddProductController.prototype.AddProduct = function () {
        var self = this;
        var productDto = {
            "Name": self.NewProductVM.Name,
            "Description": self.NewProductVM.Description,
            "Price": self.NewProductVM.Price,
            "ShortDescription": self.NewProductVM.ShortDescription,
            "Brand": self.NewProductVM.Brand,
            "ReleaseDate": self.NewProductVM.ReleaseDate,
            "Model": self.NewProductVM.Model,
            "Dimensions": self.NewProductVM.Dimensions
        };
        self.iproductService.AddOrUpdateProduct('api/Product/AddOrUpdateProduct', productDto, this);
        self.iWindowService.location.href = '/index.html#!/home';
    };
    return AddProductController;
}());
//# sourceMappingURL=addproduct.controller.js.map
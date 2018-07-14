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
            "Category": self.NewProductVM.Category,
            "Dimensions": self.NewProductVM.Dimensions
        };
        self.iproductService.AddOrUpdateProduct('api/Product/AddOrUpdateProduct', productDto, this, this.UploadFile);
        //self.iWindowService.location.href = '/index.html#!/usersmanager';
    };
    AddProductController.prototype.UploadFile = function (response) {
        debugger;
        var data = new FormData();
        var files = $("#fileUpload").get(0).files;
        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "/api/Product/uploadfile?nume=" + "response" + "&id=" + response,
            contentType: false,
            processData: false,
            data: data
        });
        ajaxRequest.done(function (xhr, textStatus) {
            // Do other operation
        });
    };
    return AddProductController;
}());
//# sourceMappingURL=addproduct.controller.js.map
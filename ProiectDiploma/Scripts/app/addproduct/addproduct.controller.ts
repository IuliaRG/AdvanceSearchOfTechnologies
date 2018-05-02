class AddProductController {
    protected NewProductVM: ProductDetailsModel;
    protected httpService: ng.IHttpService;
    protected iproductService: IProductService;
    protected iUserRoleService: IUserRoleService;
    protected iWindowService: ng.IWindowService;
    protected users: Array<any>;

    constructor(iLocalStorageService: ILocalStorageService, iUserRoleService: IUserRoleService, iproductService: IProductService, $window: ng.IWindowService, $http: ng.IHttpService) {
        this.httpService = $http;
        this.iproductService = iproductService;
       
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.NewProductVM = new ProductDetailsModel();
        this.iUserRoleService.CheckUser("Admin", "addproduct");
        this.users = null;
       
    }
    protected AddProduct(): void {
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
    }
}
  




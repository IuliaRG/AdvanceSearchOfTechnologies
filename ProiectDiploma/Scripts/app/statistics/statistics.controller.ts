class StatisticsController {
    protected ProductsDataVM: ProductsDataModel;
    protected httpService: ng.IHttpService;
    protected iProductService: IProductService;
    protected iUserRoleService: IUserRoleService;
    protected iWindowService: ng.IWindowService;
    protected users: Array<any>;

    constructor(iLocalStorageService: ILocalStorageService, iUserRoleService: IUserRoleService, iProductService: IProductService, $window: ng.IWindowService, $http: ng.IHttpService) {
        this.httpService = $http;
       
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.iProductService = iProductService;
        this.ProductsDataVM = new ProductsDataModel();
     //   this.initialize();
       // this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.users = null;
      this.iProductService.GetAllBrands("api/Product/GetAllBrands", this, this.GetBrandsCallback);
        
    }
    protected GetProducts(name: string)
    {
        this.iProductService.GetProductByBrand("api/Product/GetBrandProducts?brandName=", name, this, this.GetBrandsProductCallback);
       
    }
    protected GetBrandsCallback(data: any, self: StatisticsController): void {
        self.ProductsDataVM.FromBrandsDto(data);
        console.log("code" + self.ProductsDataVM.Brand);
    }
    protected GetBrandsProductCallback(data: any, self: StatisticsController): void {
        self.ProductsDataVM.FromProductsBrandDto(data);
        console.log("code" + self.ProductsDataVM.Products);
    }
    public initialize(): void {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        }, 1000);

    }
    public loadScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    }
   
}
class ProductsDataModel {
    
    public Brand: Array<any>;
    public Products: Array<any>;
    constructor() {
        this.Brand = new Array<string>();
        this.Products = new Array<string>();
    }
    public FromBrandsDto(dto: any): ProductsDataModel {
     
        this.Brand = dto;
       
        return this;
    }
    public FromProductsBrandDto(dto: any): ProductsDataModel {

        this.Products = dto;

        return this;
    }


}

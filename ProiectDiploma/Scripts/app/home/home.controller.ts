class HomeController {
    protected _httpService: ng.IHttpService;
    protected ProductVM: ProductPageModel;
    protected iProductService: IProductService;
    protected iLocalStorageService: ILocalStorageService;
    protected currentUser: CurrentUserModel;
    constructor(iLocalStorageService: ILocalStorageService,iProductService: IProductService, $http: ng.IHttpService) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new ProductPageModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        console.log(this.currentUser.email);
        this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
    }
    protected GetProductsCallback(data: any, self: HomeController): void {
        self.ProductVM.FromProductsDto(data);
        console.log(self.ProductVM.products);
   
    }
    public initialize(): void {
        var self = this;
        setTimeout(function () {
            self.loadChatScript('jquery-3.2.1.js');
            self.loadChatScript('jquery.signalR-2.2.3.min.js');
            self.loadHub();
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
           
        }, 1000);
       
    }
    public loadHub() {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'signalr/hubs';
        head.appendChild(script);
    }
    public loadChatScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'Scripts/' + path;
        head.appendChild(script);
    }
    public loadScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    }
   
}

class ProductPageModel {
    public Id: number;
    public Name: string;
    public Description: string;
    public Price: string;
    public Code: string;
    public products: Array<any>;
    constructor() {
        this.products = new Array<ProductDetailsModel>();
    }
    public FromProductsDto(data: any): any {
       
        this.products = data.map(dto => ((new ProductDetailsModel()).FromProductDto(dto)));
       
        return this;
    }
}

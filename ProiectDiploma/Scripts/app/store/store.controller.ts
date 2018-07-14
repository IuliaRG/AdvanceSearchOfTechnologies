class StoreController {
    protected _httpService: ng.IHttpService;
    protected ProductVM: StorePageModel;
    protected iProductService: IProductService;
    protected iLocalStorageService: ILocalStorageService;
    protected iWindowService: ng.IWindowService;
    protected currentUser: CurrentUserModel;
    public Discussion: Array<string>;
    protected Message: string;
    protected myHub: any;
    protected chat: any;
    protected scope: any;
    protected id: any;
    private route: any;
    constructor($scope, iLocalStorageService: ILocalStorageService, iProductService: IProductService, $http: ng.IHttpService, $window: ng.IWindowService, $routeParams: ng.RouteData) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new StorePageModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.iWindowService = $window;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        this.route = $routeParams;
        // this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
        this.Discussion = [];
        this.scope = $scope;
        this.ProductPagination(null, null, (this.route && this.route.category) ? this.route.category : null, (this.route && this.route.brand) ? this.route.brand : null);
    }
    protected GetProductsCallback(data: any, self: StoreController): void {
        self.ProductVM.FromProductsDto(data);
        console.log("current page " + self.ProductVM.CurrentPage);
        self.loadBootstrap();
    }
    protected LogOut(): void {
        this.iLocalStorageService.LogOut(' api/Account/Logout');
        //this.iWindowService.location.href = '/index.html#!/home';

    }
    protected ProductPagination(itemsNumber?: number, pageNumber?: number, category?: string, brand?: string) {
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
    }
    public loadBootstrap(): void {
        var self = this;
        setTimeout(() => {
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        });
    }
    public initialize(): void {
        var self = this;
        setTimeout(() => {
            self.loadScript('jquery.js');
            //self.loadBoostrapScript('bootstrap.min.css');
            self.loadCssScript('base.css');
           

        }, 1000);

    }
  
   
    public loadScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    }
    public loadBoostrapScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/bootshop/' + path;
        head.appendChild(script);
    }
    public loadCssScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/css/' + path;
        head.appendChild(script);
    }
}

class StorePageModel {
    public Id: number;
    public Name: string;
    public Description: string;
    public Price: string;
    public Code: string;
    public CurrentPage: number;
    public PageNumber: number;
    public ItemsOnPage: number;
    public SearchText: string;
    public Brand: string;
    public MaxPageItems: number;
    public NextPage: string;
    public PreviousPage: string;
    public SortDirection: string;
    public SortField: string;
    public LastPage: string;
    public Category: string;
    public Image: string;
    public products: Array<any>;
    public meniu: Array<any>;
    constructor() {
        this.products = new Array<ProductDetailsModel>();
        this.meniu = new Array<StoreMeniuModel>();
    }
    public FromProductsDto(data: any): any {
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.LastPage = data.LastPage;
        this.SortField = data.SortField;
        this.Image = data.Image;
        this.meniu = data.Meniu.map(dto => ((new StoreMeniuModel()).FromMeniuDto(dto)));
        this.products = data.Data.map(dto => ((new ProductDetailsModel()).FromProductDto(dto)));
        return this;
    }
}
class StoreMeniuModel {
    public Category: Array<any>;
    public Brands: Array<any>;
    constructor() {
        this.Brands = new Array<string>();
    }
    public FromMeniuDto(dto: any): StoreMeniuModel {
        this.Category = dto.Category;
        this.Brands = dto.Brands;

        return this;
    }
}





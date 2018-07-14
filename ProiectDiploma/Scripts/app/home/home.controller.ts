class HomeController {
    protected _httpService: ng.IHttpService;
    protected ProductVM: ProductPageModel;
    protected PopularProductVM: PopularProductModel;
    protected iProductService: IProductService;
    protected iLocalStorageService: ILocalStorageService;
    protected iWindowService: ng.IWindowService;
    protected currentUser: CurrentUserModel;
    public Discussion: Array<string>;
    protected Message: string ;
    protected myHub: any;
    protected chat: any;
    protected scope: any;
    protected id: any;
    protected bestProducts: any;
    protected iUserService: IUserService;
    private route: any;
    public role: any;
    public isAdmin: boolean;
    constructor($scope, iLocalStorageService: ILocalStorageService, iUserService: IUserService , iProductService: IProductService, $http: ng.IHttpService, $window: ng.IWindowService, $routeParams: ng.RouteData) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new ProductPageModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.isAdmin = false;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        this.route = $routeParams;

        this.PopularProductVM = new PopularProductModel();
       // this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
        this.Discussion = [];
        this.scope = $scope;
        this.ProductPagination(null, null, (this.route && this.route.category) ? this.route.category : null, (this.route && this.route.brand) ? this.route.brand : null);
        this.GetPopularProducts();
        this.GetRole(this.currentUser,this);
    }
    protected GetRole(data: any, self: any): void {
        self = this;
        if (self.currentUser != null) {
            var config: angular.IRequestShortcutConfig = {
                headers: {
                    "Authorization": 'Bearer ' + self.currentUser.token,
                }
            }
            self.iUserService.GetUserRole('api/User/GetRole', config, self, self.GetRoleCallback);
       }
       
    }
    protected GetRoleCallback(user: any, self: HomeController): void {
     
        self.role = user.Roles;
      
        if (self.role.indexOf("Admin") > -1) {
            self.isAdmin = true;
        }
    }

    //protected GetUserRole(): void {
    //    var self = this;
    //   self.role = false;
    //   if (self.currentUser!=null && self.currentUser.role.indexOf("Admin") > -1) {
    //       self.role = true;
    //    }
    //}
    protected GetProductsCallback(data: any, self: HomeController): void {
        self.ProductVM.FromProductsDto(data);
        console.log(self.ProductVM.CurrentPage);
     
        self.loadBootstrap();
    }
    protected GetPopularProductsCallback(data: any, self: HomeController): void {
  
        self.PopularProductVM.FromProductsDto(data);
        console.log(self.PopularProductVM.Name);
      
    }
    protected GetPopularProducts(): void {
        var self = this;
        self.iProductService.GetPopularProducts('api/Product/GetPopularProducts', this, this.GetPopularProductsCallback);


    }
    protected LogOut(): void {
        this.iLocalStorageService.LogOut(' api/Account/Logout');
      //this.iWindowService.location.href = '/index.html#!/home';

    }
    protected ProductPagination(itemsNumber?: number, pageNumber?: number,category? :string ,brand? : string) {
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
           
            $(() => {
                self.chat = (<any>$).connection.chatHub;
                this.chat.client.receiveFromAdmin = (from: string, message: string) => { self.ReceiveFromAdmin(from, message, self) };
                $('#message').focus();
                (<any>$).connection.hub.start().done(() => {
                    self.id = this.chat.connection.id;
                    self.chat.server.register(this.id);
                });
            });
           
        }, 1000);

    }
    public SendMessage()
    {
       
        this.Discussion.push(this.Message);
        this.chat.server.sendToAdmin(this.Message, this.id);
        this.Message = " ";
    }
    public ReceiveFromAdmin(from: string, message: string, self: HomeController)
    {
       
        self.Discussion.push('Message from' + ' ' + from + ':' +' ' + message);
        self.scope.$apply();
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
class PopularProductModel
{
    public Id: number;
    public Name: string;
    public Image: string;
    public Price: string;
    public popularProducts: Array<any>;
    constructor() {
        this.popularProducts = new Array<ProductDetailsModel>();
    }
   
    public FromProductsDto(data: any): any {
    
        this.popularProducts = data.map(dto => ((new ProductDetailsModel()).FromProductDto(dto)));
        return this;
    }
}
class ProductPageModel {
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
        this.meniu = new Array<MeniuModel>();
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
        this.meniu = data.Meniu.map(dto => ((new MeniuModel()).FromMeniuDto(dto)));
        
        this.products = data.Data.map(dto => ((new ProductDetailsModel()).FromProductDto(dto)));
        return this;
    }
}
class MeniuModel {
    public Category: Array<any>;
    public Brands: Array<any>;
    constructor() {
        this.Brands = new Array<string>();
    }
    public FromMeniuDto(dto: any): MeniuModel {
        this.Category = dto.Category;
        this.Brands = dto.Brands;
       
        return this;
    }
}



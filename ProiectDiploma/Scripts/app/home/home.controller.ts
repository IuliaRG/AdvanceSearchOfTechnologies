class HomeController {
    protected _httpService: ng.IHttpService;
    protected ProductVM: ProductPageModel;
    protected iProductService: IProductService;
    protected iLocalStorageService: ILocalStorageService;
    protected currentUser: CurrentUserModel;
    public Discussion: Array<string>;
    protected Message: string ;
    protected myHub: any;
    protected chat: any;
    protected scope: any;
    protected id: any;
    constructor($scope, iLocalStorageService: ILocalStorageService, iProductService: IProductService, $http: ng.IHttpService) {
        this.initialize();
        this._httpService = $http;
        this.ProductVM = new ProductPageModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        console.log(this.currentUser.email);
       // this.iProductService.GetProduct('api/Product/GetAllProducts', this, this.GetProductsCallback);
        this.Discussion = [];
        this.scope = $scope;
        this.ProductPagination();
    }
    protected GetProductsCallback(data: any, self: HomeController): void {
        self.ProductVM.FromProductsDto(data);
        console.log("current page " + self.ProductVM.CurrentPage);
   
    }
    protected ProductPagination(itemsNumber?: number, pageNumber?: number) {
        var self = this;
        self.ProductVM.ItemsOnPage = itemsNumber;
        self.ProductVM.PageNumber = pageNumber;
        var pageDto = {
            "PageNumber": self.ProductVM.PageNumber,
           "ItemsOnPage": self.ProductVM.ItemsOnPage,
           "SortDirection": self.ProductVM.SortDirection,
           "SortField": self.ProductVM.SortField,
            "CurrentPage": self.ProductVM.CurrentPage,
        };
       
        self.iProductService.GetPageProducts('api/Product/ProductPage', pageDto, this, this.GetProductsCallback);
    }
    public initialize(): void {
        var self = this;
        setTimeout(() => {
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
            self.loadBoostrapScript('bootstrap.min.css');
         
           self.loadCssScript('base.css');
            console.log(0);
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
        this.myHub = $;
        this.chat = this.myHub.connection.chatHub;
        debugger
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
    public MaxPageItems: number;
    public NextPage: string;
    public PreviousPage: string;
    public SortDirection: string;
    public SortField: string;
    public LastPage: string;
    public products: Array<any>;
    constructor() {
        this.products = new Array<ProductDetailsModel>();
    }
    public FromProductsDto(data: any): any {
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.LastPage = data.LastPage;
        this.SortField = data.SortField;
        this.products = data.Data.map(dto => ((new ProductDetailsModel()).FromProductDto(dto)));
        return this;
    }
}




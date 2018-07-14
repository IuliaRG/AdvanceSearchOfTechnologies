﻿class ProductDetailsController {
    protected _httpService: ng.IHttpService;
    protected ProductDetailsVM: ProductDetailsModel;
    protected ProducReviewVM: ProducReviewModel;
    protected iProductService: IProductService;
    protected iLocalStorageService: ILocalStorageService;
    protected currentUser: CurrentUserModel;
    private iWindowService: ng.IWindowService;
    protected ProductVM: StorePageModel;
    private route: any;
    constructor(iLocalStorageService: ILocalStorageService, $window: ng.IWindowService,iProductService: IProductService, $http: ng.IHttpService, $routeParams: ng.RouteData) {
        this.initialize();
        this._httpService = $http;
        this.iWindowService = $window;
        this.ProductDetailsVM = new ProductDetailsModel();
        this.ProducReviewVM = new ProducReviewModel();
        this.iProductService = iProductService;
        this.iLocalStorageService = iLocalStorageService;
        this.currentUser = iLocalStorageService.GetCurrentUser();
      
        this.route = $routeParams;
        this.iProductService.GetProduct("api/Product/GetProductByID?id=" + this.route.id, this, this.GetProductCallback);
        this.ProductVM = new StorePageModel();
        this.Meniu();
        
    }
    protected Meniu(itemsNumber?: number, pageNumber?: number, category?: string, brand?: string) {
        var self = this;
        self.ProductVM.ItemsOnPage = itemsNumber;
        self.ProductVM.PageNumber = pageNumber;
        self.ProductVM.Brand = brand;
        self.ProductVM.Category = category;
        var pageDto = {


            "Brand": self.ProductVM.Brand,
            "Category": self.ProductVM.Category,
        };

        self.iProductService.GetPageProducts('api/Product/ProductPage', pageDto, this, this.GetMeniuCallback);
    }
    protected GetMeniuCallback(data: any, self: ProductDetailsController): void {
        self.ProductVM.FromProductsDto(data);

        self.loadBootstrap();
    }
    public loadBootstrap(): void {
        var self = this;
        setTimeout(() => {
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        });
    }
   
    protected GetProductCallback(data: any, self: ProductDetailsController): void {
        self.ProductDetailsVM.FromProductDto(data);
        console.log("code" + self.ProductDetailsVM.Reviews);
        
    }
    protected LogOut(): void {
        this.iLocalStorageService.LogOut(' api/Account/Logout');
   

    }
  
    protected AddReview(): void {
        var self = this;
        var config: angular.IRequestShortcutConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        }
        var userDto = {
            "Content": self.ProducReviewVM.Content,
            "ProductId": self.ProductDetailsVM.Id,
            "Brand": self.ProductDetailsVM.Brand,
            "ProductCode": self.ProductDetailsVM.Code,
          
        };
        self.iProductService.AddOrUpdateReview('api/Review/AddOrUpdate', config,userDto, this);
        self.iWindowService.location.href = '/index.html#!/home';
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

class ProducReviewModel {
    public Content: string;
    public ProductCode: string;
    public reviews: Array<any>;
    constructor() {
       
    }
   
    public FromProductReviewDto(dto: any): ProducReviewModel {
       
        this.Content = dto.Content;
        return this;
    }
  
}
class ProductDetailsModel {
    public Id: number;
    public Name: string;
    public Description: string;
    public Price: string;
    public Code: string;
    public ShortDescription: string;
    public Brand: string;
    public ReleaseDate: Date;
    public Model: string;
    public Dimensions: string;
    public Category: string;
    public Image: string;
    public Reviews: Array<any>;
    constructor() {
        this.Reviews = new Array<ProducReviewModel>();
    }
    public FromProductDto(dto: any): ProductDetailsModel {
        this.Id = dto.Id;
        this.Name = dto.Name;
        this.Description = dto.Description;
        this.Price = dto.Price;
        this.Code = dto.Code;
        this.Image = dto.Image;
        this.ShortDescription = dto.ShortDescription;
        this.Brand = dto.Brand;
        this.ReleaseDate = dto.ReleaseDate;
        this.Model = dto.Model;
        this.Category = dto.Category;
        this.Dimensions = dto.Dimensions;
        this.Reviews = dto.Reviews.map(data => ((new ProducReviewModel()).FromProductReviewDto(data)));
        return this;
    }
  
   
}
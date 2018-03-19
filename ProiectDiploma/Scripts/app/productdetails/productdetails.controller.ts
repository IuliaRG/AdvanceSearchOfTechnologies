class ProductDetailsController {
    protected _httpService: ng.IHttpService;
    protected ProductDetailsVM: ProductDetailsModel;
    protected iProductService: IProductService;
    private route: any;
    constructor(iProductService: IProductService, $http: ng.IHttpService, $routeParams: ng.RouteData) {
        this.initialize();
        this._httpService = $http;
        this.ProductDetailsVM = new ProductDetailsModel();
        this.iProductService = iProductService;
        this.route = $routeParams;
        this.iProductService.GetProduct("api/Product/GetProductByID?id=" + this.route.id, this, this.GetProductCallback);
    }
    protected GetProductCallback(data: any, self: ProductDetailsController): void {
        self.ProductDetailsVM.FromProductDto(data);
        console.log("code"+self.ProductDetailsVM.Code);
        
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
    constructor() {
    }
    public FromProductDto(dto: any): ProductDetailsModel {
        this.Id = dto.Id;
        this.Name = dto.Name;
        this.Description = dto.Description;
        this.Price = dto.Price;
        this.Code = dto.Code;
        this.ShortDescription = dto.ShortDescription;
        this.Brand = dto.Brand;
        this.ReleaseDate = dto.ReleaseDate;
        this.Model = dto.Model;
        this.Dimensions = dto.Dimensions;
        return this;
    }
}
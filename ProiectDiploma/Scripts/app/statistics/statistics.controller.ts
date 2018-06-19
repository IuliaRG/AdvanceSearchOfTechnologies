class StatisticsController {
    protected ProductsDataVM: ProductsDataModel;
    protected StatisticsVM: ReviewStatisticsModel;
    protected httpService: ng.IHttpService;
    protected iProductService: IProductService;
    protected iUserRoleService: IUserRoleService;
    protected iWindowService: ng.IWindowService;
    protected users: Array<any>;
    protected scope: ng.IScope;

    constructor(iLocalStorageService: ILocalStorageService, iUserRoleService: IUserRoleService, iProductService: IProductService, $window: ng.IWindowService, $scope: ng.IScope, $http: ng.IHttpService) {
        this.httpService = $http;
       
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.iProductService = iProductService;
        this.ProductsDataVM = new ProductsDataModel();
        this.StatisticsVM = new ReviewStatisticsModel();
       this.initialize();
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.users = null;
        this.scope = $scope;
      this.iProductService.GetAllBrands("api/Product/GetAllBrands", this, this.GetBrandsCallback);
    }
    public initialize(): void {
        var self = this;
        setTimeout(function () {
           // self.loadScript('jquery.js');
           // self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
            self.loadBoostrapScript('bootstrap.min.css');
        
           //self.loadCssScript('ng-google-chart.js');
        }, 1000);

    }
   
    
    public loadBoostrapScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/bootshop/' + path;
        head.appendChild(script);
    }
    public loadScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    }
    public loadCssScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'Scripts/' + path;
        head.appendChild(script);
    }
    protected GetProducts(name: string)
    {
        this.iProductService.GetProductByBrand("api/Product/GetBrandProducts?brandName=", name, this, this.GetBrandsProductCallback);

    }
    protected GetBrandsCallback(data: any, self: StatisticsController): void {
        self.ProductsDataVM.FromBrandsDto(data);
    }
    protected GetReviewStatisticsCallback(data: any, self: StatisticsController): void {
        self.StatisticsVM.FromReviewStatisticsDto(data);
        
        self.scope.myChartObject = {};
        self.scope.myChartObject.type = "PieChart";
        self.scope.myChartObject.data = {
            "cols": [
                { id: "t", label: "Statistics", type: "string" },
                { id: "s", label: "Slices", type: "number" }
            ], "rows": [
                {
                    c: [
                        { v: "Bad" },
                        { v: self.StatisticsVM.Bad },
                    ]
                },
                {
                    c: [
                        { v: "Medium" },
                        { v: self.StatisticsVM.Medium }
                    ]
                },
                {
                    c: [
                        { v: "Excellent" },
                        { v: self.StatisticsVM.Excellent },
                    ]
                }
            ]
        };

        self.scope.myChartObject.options = {
            'title': 'Statistics'
        };
      
 
    }
    protected ExtractData(name: any)
    {
        
        const rows = [["Bad", "Medium", "Excellent"], [this.StatisticsVM.Bad, this.StatisticsVM.Medium, this.StatisticsVM.Excellent]];;
        let csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(function (rowArray) {
            var row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
       
        link.setAttribute("id", "downloadLink");
       
        link.setAttribute("download", name+".csv");
        document.body.appendChild(link); 

        link.click();
       document.getElementById("downloadLink").remove();

    }


    protected GetBrandsProductCallback(data: any, self: StatisticsController, brand: string): void {
        
        var index = self.ProductsDataVM.Brand.map(brand => brand.Name).indexOf(brand);
        self.ProductsDataVM.Brand[index].Products = data; 
        self.ProductsDataVM.Brand[index].Products.map(dto => ((new ProductModel()).FromProductDto(dto)));
   
    }
    protected CreatProductChart(id:number) :void
    {
        this.iProductService.GetProductByBrand("api/Review/GetProductReviewsStatistics?id=", id, this, this.GetReviewStatisticsCallback);
    }
    protected CreatBrandChart(brand: string): void {
        this.iProductService.GetProductByBrand("api/Review/GetBrandReviewsStatistics?brandName=", brand, this, this.GetReviewStatisticsCallback);
    }
}
class ProductsDataModel {
    public Brand: Array<any>;
    public Products: Array<ProductModel>;
    constructor() {
        this.Brand = new Array<any>();
        this.Products = new Array<ProductModel>();
    }
    public FromBrandsDto(dto: any): ProductsDataModel {
        this.Brand = dto;
        return this;
    }
   
}
class ProductModel {
    public Id: number;
    public Name: string;
    public ToolbarId: string;
    public FromProductDto(dto: any): ProductModel {
        this.Id = dto.Id;
        this.Name = dto.Name;
        return this;
    }
}
class ReviewStatisticsModel {
    public Bad: number;
    public Medium: number;
    public Excellent: number;
    public FromReviewStatisticsDto(dto: any): ReviewStatisticsModel {
        this.Bad = dto.Bad;
        this.Medium = dto.Medium;
        this.Excellent = dto.Excellent;
        return this;
    }
}
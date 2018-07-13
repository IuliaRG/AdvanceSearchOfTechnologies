interface IProductService {
    GetProduct(url: string, caller: any, successCallback: Function): any;
    GetPopularProducts(url: string, caller: any, successCallback: Function): any;
    GetAllBrands(url: string, caller: any, successCallback: Function): any;
    GetProductByBrand(url: string, id: any, caller: any, successCallback: Function): any;
    GetProductReviews(url: string, caller: any): any;
    GetProductPage(url: string, data: any, caller: any, successCallback: Function): any;
    DeleteProduct(url: string, id: any, caller: any, successCallback: Function);
    AddOrUpdateProduct(url: string, data: any, caller: any);
    GetPageProducts(url: string, data: any, caller: any, successCallback: Function): any;
    AddOrUpdateReview(url: string,config:any, data: any, caller: any);

}
class ProductService implements IProductService {
    private _iHttpService: ng.IHttpService;
    private iWindowService: ng.IWindowService;

    constructor($http: ng.IHttpService, $window: ng.IWindowService) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    public GetProduct(url: string, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url, {}).then((response) => {
                
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetPopularProducts(url: string, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url, {}).then((response) => {

                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetProductByBrand(url: string, brand: any, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url + brand, {}).then((response) => {
                console.log(response);
                successCallback(response.data, caller, brand);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetAllBrands(url: string, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url, {}).then((response) => {

                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetProductReviews(url: string, caller: any): any {
        this._iHttpService.get(
            url, {}).then((response) => {

                console.log(response);
               
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetPageProducts(url: string, data: any, caller: any, successCallback: Function): any {
        this._iHttpService.post(
            url, data).then((response) => {
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
            });
    }
    public GetProductPage(url: string, data: any, caller: any, successCallback: Function): any {
        this._iHttpService.post(
            url, data).then((response) => {
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
            });
    }
    public AddOrUpdateProduct(url: string,data: any, caller: any): any {
        this._iHttpService.post(
            url,  data).then((response) => {
            }).catch((err) => {
            });
    }
    public AddOrUpdateReview(url: string, config: any, data: any, caller: any): any {
    this._iHttpService.post(url, data, config)
    .then((response) => {
        console.log(response);
    }).catch((err) => {
    });
    }
    public DeleteProduct(url: string, id: any, caller: any, successCallback: Function): any {
        this._iHttpService.delete(
            url + id, {}).then((response) => {
                console.log(response);
                successCallback(caller);
            }).catch((err) => {
            });
    }
}



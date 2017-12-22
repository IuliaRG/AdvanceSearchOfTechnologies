interface IDataService {
    Get(url: string, caller: any, successCallback: Function): any;
    GetById(url: string, id: any, caller: any, successCallback: Function): any;
    Post(url: string, entity: any, caller: any);
    LogIn(entity: any, caller: any);
    Delete(url: string, id: any, caller: any, successCallback: Function): any;
}
class DataService implements IDataService {
    private _iHttpService: ng.IHttpService;
    constructor($http: ng.IHttpService) {
        this._iHttpService = $http;
    }

    public Get(url: string, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url, {}).then( (response)=> {
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetById(url: string, id: any, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url + id, {}).then( (response) => {
                console.log(response);
                successCallback(response.data, caller);
            }).catch( (err) =>{
                console.log(err);
            });
    }
   
    public Post(url: string, data: any, caller: any): any {
        this._iHttpService.post(
            url, { data: data, }).then( (response) =>{
                console.log(response);
                debugger
               // successCallback(response.data, caller);
            }).catch( (err) =>{
             //  errorCallback(err);
            });
    }
    public LogIn(data: any, caller: any): any {
        this._iHttpService(data).then((response) => {
                console.log(response);
               
                 //successCallback(response.data, caller);
            }).catch((err) => {
                //  errorCallback(err);
            });
    }
    public Delete(url: string, id: any, caller: any, successCallback: Function): any {
        this._iHttpService.delete(
            url + id, {}).then( (response)=> {
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) =>{
                console.log(err);
            });
    }
}



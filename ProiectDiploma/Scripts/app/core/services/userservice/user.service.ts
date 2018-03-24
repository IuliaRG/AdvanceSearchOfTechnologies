interface IUserService {
    GetUser(url: string, caller: any, successCallback: Function): any;
    GetUserRole(url: string, data: any, caller: any, successCallback: Function): any;
    DeleteUser(url: string, id: any, caller: any, successCallback: Function);
    UserUpdate(url: string, data: any, caller: any);
    GetPageItems(url: string, data: any, caller: any, successCallback: Function): any;
    GetCurrentUser(url: string, data: any, caller: any, successCallback: Function): any;
}
class UserService implements IUserService {
    private _iHttpService: ng.IHttpService;
    private iWindowService: ng.IWindowService;

    constructor($http: ng.IHttpService, $window: ng.IWindowService) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    public GetUser(url: string, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url, {}).then((response) => {
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetCurrentUser(url: string,data:any, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url, data).then((response) => {
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetUserRole(url: string, data: any, caller: any, successCallback: Function): any {
        this._iHttpService.get(
            url, data).then((response) => {
                successCallback(response.data, caller);
            }).catch((err) => {
                console.log(err);
            });
    }
    public GetPageItems(url: string, data: any, caller: any, successCallback: Function): any {
        this._iHttpService.post(
            url, data).then((response) => {
                console.log(response);
                successCallback(response.data, caller);
            }).catch((err) => {
            });
    }
    public UserUpdate(url: string, data: any, caller: any): any {
        this._iHttpService.post(
            url, data).then((response) => {
            }).catch((err) => {
            });
    }
    public DeleteUser(url: string, id: any, caller: any, successCallback: Function): any {
        this._iHttpService.delete(
            url + id, {}).then((response) => {
                console.log(response);
                successCallback(caller);
            }).catch((err) => {
            });
    }
}



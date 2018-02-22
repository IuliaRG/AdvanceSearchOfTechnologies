interface IAccountService {
    LogIn(entity: any, caller: any, successCallback: Function): any;
    UserRegister(url: string, config: any, data: any, caller: any, successCallback: Function, errorCallback: Function): any;
    ForgotPassword(url: string, config: any, data: any, caller: any, successCallback: Function): any;
    ResetPassword(url: string, config: any, data: any, caller: any, successCallback: Function): any;
}
class AccountService implements IAccountService {
    private _iHttpService: ng.IHttpService;
    private iWindowService: ng.IWindowService;
    constructor($http: ng.IHttpService, $window: ng.IWindowService) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    public UserRegister(url: string, config:any,data: any, caller: any, successCallback: Function, errorCallback: Function): any {
        this._iHttpService.post(
            url, data).then((response) => {
                successCallback(response.data, caller);
            }).catch((err) => {
                errorCallback(err);

            });
    }
    public ForgotPassword(url: string,config:any, data: any, caller: any, successCallback: Function): any {
        this._iHttpService.post(
            url, data).then((response) => {
                successCallback(response.data, caller);
            }).catch((err) => {
            });
    }
    public ResetPassword(url: string, config: any, data: any, caller: any, successCallback: Function): any {
        this._iHttpService.post(
            url, data).then((response) => {
                successCallback(response.data, caller);
            }).catch((err) => {
            });
    }
    public LogIn(data: any, caller: any, successCallback: Function): any {
        this._iHttpService(data).then((response) => {
            console.log(response.data);
            successCallback(response.data, caller);
        }).catch((err) => {

        });
    }
}


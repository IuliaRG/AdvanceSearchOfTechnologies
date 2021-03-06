//interface IUserService {
//    Get(url: string, caller: any, successCallback: Function): any;
//    GetById(url: string, id: any, caller: any, successCallback: Function): any;
//    Post(url: string, entity: any, caller: any);
//    LogIn(entity: any, caller: any, successCallback: Function): any;
//    Delete(url: string, id: any, caller: any);
//    PostCallback(url: string, entity: any, caller: any, successCallback: Function): any;
//}
//class UserService implements IUserService {
//    private _iHttpService: ng.IHttpService;
//    private iWindowService: ng.IWindowService;
//    constructor($http: ng.IHttpService, $window: ng.IWindowService) {
//        this._iHttpService = $http;
//        this.iWindowService = $window;
//    }
//    public Get(url: string, caller: any, successCallback: Function): any {
//        this._iHttpService.get(
//            url, {}).then((response) => {
//                console.log(response);
//                successCallback(response.data, caller);
//            }).catch((err) => {
//                console.log(err);
//            });
//    }
//    public GetById(url: string, id: any, caller: any, successCallback: Function): any {
//        this._iHttpService.get(
//            url + id, {}).then((response) => {
//                console.log(response);
//                successCallback(response.data, caller);
//            }).catch((err) => {
//                console.log(err);
//            });
//    }
//    public PostCallback(url: string, data: any, caller: any, successCallback: Function): any {
//        this._iHttpService.post(
//            url, data).then((response) => {
//                console.log(response);
//                successCallback(response.data, caller);
//            }).catch((err) => {
//            });
//    }
//    public ResetPassword(url: string, data: any, caller: any, successCallback: any): any {
//        this._iHttpService.post(
//            url, data).then((response) => {
//                console.log(response);
//                successCallback(response.data, caller);
//            }).catch((err) => {
//            });
//    }
//    public UpdateUser(url: string, data: any, caller: any): any {
//        this._iHttpService.post(
//            url, data).then((response) => {
//                console.log(response);
//            }).catch((err) => {
//            });
//    }
//    public LogIn(data: any, caller: any, successCallback: Function): any {
//        this._iHttpService(data).then((response) => {
//            console.log(response.data);
//            successCallback(response.data, caller);
//        }).catch((err) => {
//        });
//    }
//    public DeleteUser(url: string, id: any, caller: any): any {
//        this._iHttpService.delete(
//            url + id, {}).then((response) => {
//                console.log(response);
//            }).catch((err) => {
//                console.log(err);
//            });
//    }
//}
//# sourceMappingURL=UserService.js.map
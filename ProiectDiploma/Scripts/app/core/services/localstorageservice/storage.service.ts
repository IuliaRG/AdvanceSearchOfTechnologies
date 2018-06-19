interface ILocalStorageService {
    SetCurrentUser(name: string, data: any): any;
    GetCurrentUser();
    LogOut(url:string): any;
}
class LocalStorageService implements ILocalStorageService {
    protected currentUser: string;
    private _iHttpService: ng.IHttpService;
    private iWindowService: ng.IWindowService;
    constructor($http: ng.IHttpService, $window: ng.IWindowService) {
        this._iHttpService = $http;
        this.iWindowService = $window;
    }
    public SetCurrentUser( name:string,data:any):any
    {
        this.currentUser = name;
        localStorage.setItem(name, data);
    }
    public GetCurrentUser(): any {
       
        if (localStorage.currentUser != null)
        {
            return <CurrentUserModel>JSON.parse(localStorage.currentUser);
        }
       
    }
    public LogOut(url: string) {
        
        localStorage.removeItem("currentUser");
        this._iHttpService.post(
            url, {}).then((response) => {
                this.iWindowService.location.href = '/index.html#!/home';
            }).catch((err) => {

            });
        
    }
}

    class CurrentUserModel {
    public email: string;
    public name: string;
    public isAdmin: boolean;
    public token: string;
    public tokenType: string;
    public role: Array<string>;
    constructor() {
        this.role = new Array< string>();
    }
}

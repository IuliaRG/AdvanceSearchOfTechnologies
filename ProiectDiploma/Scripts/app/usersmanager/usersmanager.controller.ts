class UsersManagerController {
   // protected UsersManagerVM: UsersManagerModel;
    protected _httpService: ng.IHttpService
    protected _iDataService: IDataService;
    constructor(iDataService: IDataService,$window: ng.IWindowService, $http: ng.IHttpService) {
       
        this._httpService = $http;
        this._iDataService = iDataService;
    }



    
}


class UserManagerDto {
    public username: string;
    public email: string;
    public password: string;
    constructor(email: string, password: string) {
        this.username = email;
        this.password = password;
    }
}
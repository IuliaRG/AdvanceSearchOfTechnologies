class UsersManagerController {
    protected UsersManagerVM: UsersManagerModel;
    protected HttpService: ng.IHttpService
    constructor($window: ng.IWindowService, $http: ng.IHttpService) {
        this.UsersManagerVM = new UsersManagerModel();
        this.HttpService = $http
    }



    
}

class UsersManagerModel {
    public drones: Array<any>;
    constructor() {
        this.drones = new Array<any>();
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
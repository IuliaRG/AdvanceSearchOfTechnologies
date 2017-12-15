class UsersManagerController {
    protected UsersManagerVM: UsersManagerModel;
    protected _httpService: ng.IHttpService;
    protected _iDataService: IDataService;
    protected a: any;
    protected b: any;
    protected c: any;
   // public Users: Array<UserModel>;
    constructor(iDataService: IDataService,$window: ng.IWindowService, $http: ng.IHttpService) {
       
        this._httpService = $http;
        this._iDataService = iDataService;
      
        this.UsersManagerVM = new UsersManagerModel();
       
        this._iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
    }

    protected GetUsersCallback(users: Array<any>, self: UsersManagerController): void {
        self.UsersManagerVM.users = users;
        
    }

    
}
class UsersManagerModel {
    public users: Array<UserModel>;
    constructor() {
        this.users = new Array<UserModel>();
    }
}
class UserModel {
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public Adress: number;
    public Email: string;
    
}

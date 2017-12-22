class UsersManagerController {
    protected UsersManagerVM: UsersManagerModel;
    protected _httpService: ng.IHttpService;
    protected _iDataService: IDataService;

    constructor(iDataService: IDataService,$window: ng.IWindowService, $http: ng.IHttpService) {
       
        this._httpService = $http;
        this._iDataService = iDataService;
        this.UsersManagerVM = new UsersManagerModel();
        this._iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
    }

    protected GetUsersCallback(users: Array<UserDto>, self: UsersManagerController): void {
        self.UsersManagerVM.users = users;
    }

    
}
class UsersManagerModel {
    public users: Array<UserDto>;
    constructor() {
        this.users = new Array<UserDto>();
    }
}
class UserDto {
    public Id: number;
    public IsActive: boolean;
    public IsDeleted: boolean;
    public Email: string;
    public UserName: string;
    public UserDetailsDto: UserDetailsDto;
    
}
class UserDetailsDto {
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public Address: string;
}
class UserDetailsController {
    protected UserDetailsVM: UserModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected route: any;

    constructor(iDataService: IDataService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {

        this.httpService = $http;
        this.iDataService = iDataService;
        this.route = $routeParams;
        this.UserDetailsVM = new UserModel();
        this.iDataService.Get("api/User?id=" + this.route.id, this, this.GetUsersCallback);
    }

    protected GetUsersCallback(user: UserDto, self: UserDetailsController): void {
        self.UserDetailsVM.FromUserDto(user);
    }

    public EditUser(): void {
     
        var self = this;
        var userDto = {
           "UserName": self.UserDetailsVM.UserName,
           "Email": self.UserDetailsVM.Email,
           "UserDetailsDto": {
               "FirstName": self.UserDetailsVM.FirstName,
               "LastName": self.UserDetailsVM.LastName,
               "Address": self.UserDetailsVM.Address
           }
        };
        this.iDataService.Post('api/User/AddOrUpdate', userDto, this);
    }
}
class UserModel {
    public Id: number;
    public Email: string;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public users: UserDto;
    constructor() {

    }

    public FromUserDto(dto: UserDto): void {
        this.Id = dto.Id;
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.UserName = dto.UserName;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
    }
    
}

class UserDetailsController {
    private UserDetailsVM: UserModel;
    private iUserService: IUserService;
    protected iUserRoleService: IUserRoleService;
    private iWindowService: ng.IWindowService;
    private route: any;
    protected currentUser: CurrentUserModel;
    constructor(iLocalStorageService: ILocalStorageService,iUserService: IUserService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService, iUserRoleService: IUserRoleService) {
        this.iUserService = iUserService;
        this.route = $routeParams;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.iUserService = iUserService;
        this.currentUser = iLocalStorageService.GetCurrentUser();
        this.UserDetailsVM = new UserModel();
        this.iUserService.GetUser("api/User/GetUserWithRoleById?id=" + this.route.id, this, this.GetUsersCallback);
    }
    protected GetUsersCallback(user: UserDto, self: UserDetailsController): void {
        self.UserDetailsVM.FromUserDto(user);
    }
    protected EditUser(): void {
        var self = this;
        var userDto = {
           "UserName": self.UserDetailsVM.UserName,
           "Email": self.UserDetailsVM.Email,
           "UserDetailsDto": {
               "FirstName": self.UserDetailsVM.FirstName,
               "LastName": self.UserDetailsVM.LastName,
               "Address": self.UserDetailsVM.Address,
           }
        };
        var config: angular.IRequestShortcutConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        }
       
        self.iUserService.UpdateUserByAdmin('api/UserManager/EditUser?RoleName=', self.UserDetailsVM.Role,config, userDto, this);
            self.iWindowService.location.href = '/index.html#!/usersmanager';
    }
}
class UserModel {
    public Id: number;
    public Email: string;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public Role: string;
    public Roles:Array<string>;
    public users: UserDto;
    constructor() {
    }
    public FromUserDto(dto: any): UserModel {
        this.Id = dto.Id;
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.UserName = dto.UserName;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.Roles = dto.Roles;

        return this;
    }
}

class UserDetailsDto {
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public Address: string;
}
class UserDto {
    public Id: number;
    public IsActive: boolean;
    public IsDeleted: boolean;
    public Email: string;
    public UserName: string;
    public Roles: any;
    public UserDetailsDto: UserDetailsDto;
}
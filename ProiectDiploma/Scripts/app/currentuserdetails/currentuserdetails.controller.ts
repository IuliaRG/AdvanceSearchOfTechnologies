class CurrentUserDetailsController {
    private CurrentUserDetailsVM: CurrentUserDetailsModel;
    private iUserService: IUserService;
    protected iLocalStorageService: ILocalStorageService;
    private iWindowService: ng.IWindowService;
    protected currentUser: CurrentUserModel;
    private route: any;
    constructor(iLocalStorageService: ILocalStorageService, iUserService: IUserService, $window: ng.IWindowService,  $http: ng.IHttpService) {
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.iLocalStorageService = iLocalStorageService;
        this.CurrentUserDetailsVM = new CurrentUserDetailsModel();
        this.currentUser = this.iLocalStorageService.GetCurrentUser();
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        }
        this.iUserService.GetCurrentUser("api/User/CurrentUser", config, this, this.GetUsersCallback);
    }
    
    protected GetUsersCallback(user: UserDto, self: CurrentUserDetailsController): void {
        self.CurrentUserDetailsVM.FromCurrentUserDto(user);
    }
    protected EditCurrentUser(): void {
        var self = this;
        var userDto = {
            "Email": self.CurrentUserDetailsVM.Email,
            "UserDetailsDto": {
                "FirstName": self.CurrentUserDetailsVM.FirstName,
                "LastName": self.CurrentUserDetailsVM.LastName,
                "Address": self.CurrentUserDetailsVM.Address
            }
        };
        self.iUserService.UserUpdate('api/User/AddOrUpdate', userDto, this);
        self.iWindowService.location.href = '/index.html#!/home';
    }
}
class CurrentUserDetailsModel {
    public Email: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public users: UserDto;
    constructor() {
    }
    public FromCurrentUserDto(dto: any): CurrentUserDetailsModel {
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
        return this;
    }
}


﻿class UserDetailsController {
    private UserDetailsVM: UserModel;
    private iUserService: IUserService;
    protected iUserRoleService: IUserRoleService;
    private iWindowService: ng.IWindowService;
    private route: any;
    constructor(iUserService: IUserService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService, iUserRoleService: IUserRoleService) {
        this.iUserService = iUserService;
        this.route = $routeParams;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.iUserService = iUserService;
        this.UserDetailsVM = new UserModel();
        this.iUserService.GetUser("api/User?id=" + this.route.id, this, this.GetUsersCallback);
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
               "Address": self.UserDetailsVM.Address
           }
        };
        self.iUserService.UserUpdate('api/User/AddOrUpdate', userDto, this);
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
    public users: UserDto;
    constructor() {
    }
    public FromUserDto(dto: any): UserModel {
        this.Id = dto.Id;
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.UserName = dto.UserName;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
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
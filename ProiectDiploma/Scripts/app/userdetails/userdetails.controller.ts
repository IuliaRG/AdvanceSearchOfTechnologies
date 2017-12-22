class UserDetailsController {
    protected UserDetailsVM: UserDetailsModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected route: any;

    constructor(iDataService: IDataService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {

        this.httpService = $http;
        this.iDataService = iDataService;
        this.route = $routeParams;
        this.UserDetailsVM = new UserDetailsModel();
        
        console.log(this.route.data);
        this.iDataService.Get("api/User?id="+this.route.id, this, this.GetUsersCallback);
    }

    protected GetUsersCallback(user: UserDto, self: UserDetailsController): void {
        console.log(user);
        self.UserDetailsVM.FromUserDto(user);
       
    }


}
class UserDetailsModel {
    public Id: number;
    public Email: string;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;

    constructor() { }

    public FromUserDto(dto: UserDto): void {
        this.Id = dto.Id;
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.UserName = dto.UserName;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
    }
}

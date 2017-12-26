class UsersManagerController {
    protected UsersManagerVM: UsersManagerModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected PaginationVM: PaginationModel;
    public UserData: Array<UserDto>
    constructor(iDataService: IDataService,$window: ng.IWindowService, $http: ng.IHttpService) {
       
        this.httpService = $http;
        this.iDataService = iDataService;
        this.UsersManagerVM = new UsersManagerModel();
        this.PaginationVM = new PaginationModel();
        //this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
       
        this.Pagination();


    }
    protected GetUsersCallback(users: Array<UserDto>, self: UsersManagerController): void {
       
        self.UsersManagerVM.users = users;
        
        
      //self.UsersManagerVM.FromUsersDto(users);
    }
    protected Pagination()
    {
        var self = this;
        
        var pageDto = {
            "PageNumber": self.PaginationVM.PageNumber,
            "ItemsOnPage": self.PaginationVM.ItemsOnPage,
        };
        self.iDataService.PostCallback('api/User/Page', pageDto, this, this.GetUsersCallback);

    }
    
    protected SetItemsPerPage(itemsNumber: number) {
       
        this.PaginationVM.ItemsOnPage = itemsNumber;

        this.Pagination()
      
    }
    
}
class UsersManagerModel {
    public users: Array<UserDto>;
    public Id: number;
    public Email: string;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public userDto: UserDto;
    constructor() {
        this.users = new Array<UserDto>();
    }
    
    //public FromUsersDto(users): void {
    //    for(var user in users)
    //    {
    //        this.userDto = new UserDto();
    //        this.userDto.Id = users.Id;
    //        this.userDto.UserDetailsDto.Address = users.UserDetailsDto.Address;
    //        this.userDto.Email = users.Email;
    //        this.userDto.UserName = users.UserName;
    //        this.userDto.UserDetailsDto.FirstName = users.UserDetailsDto.FirstName;
    //        this.userDto.UserDetailsDto.LastName = users.UserDetailsDto.LastName;
    //    }
       
    //}
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
class PaginationModel{
    public PageNumber: number;
    public ItemsOnPage: number;
    public SearchText: string;
}
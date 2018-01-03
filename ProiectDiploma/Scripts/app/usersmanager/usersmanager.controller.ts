class UsersManagerController {
    protected UsersManagerVM: UsersManagerModel;
    protected PageVM: PageModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected PaginationVM: PaginationModel;
    public UserData: Array<UserDto>
    constructor(iDataService: IDataService,$window: ng.IWindowService, $http: ng.IHttpService) {
       
        this.httpService = $http;
        this.iDataService = iDataService;
        this.UsersManagerVM = new UsersManagerModel();
        this.PageVM = new PageModel();
        this.PaginationVM = new PaginationModel();
        //this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
       
        this.Pagination();


    }
    protected GetUsersCallback(users: PageDto, self: UsersManagerController): void {
        
        // self.UsersManagerVM.users = users;
       
        console.log(users.ItemsOnPage);
        self.PageVM.FromUsersDto(users);
        console.log(self.PageVM.users);
        
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
    

}
class PageModel {
    public Id: number;
    public IsActive: boolean;
    public IsDeleted: boolean;
    public Email: string;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public PageNumber: number;
    public ItemsOnPage: number;
    public SearchText: string;
    public MaxPageItems: number;
    public NextPage: string;
    public PreviousPage: string;
    public SortDirection: string;
    public SortField: string;
    public users: Array<UserDto>;
   // public UserDetailsDto: UserDetailsDto;
 
    constructor() {
        
    }
    public FromUsersDto(dto: PageDto): void {
        this.Id = dto.Id;
        this.users = dto.users;
        
        //this.FirstName = dto.UserDto.UserDetailsDto.FirstName;
        //this.LastName = dto.UserDto.UserDetailsDto.LastName;
        //this.Email = dto.Email;
        //this.UserName = dto.UserName;
        this.ItemsOnPage = dto.ItemsOnPage;
        this.PageNumber = dto.PageNumber;
        this.MaxPageItems = dto.MaxPageItems;
    }
    
}
class PageDto{

    public Id: number;
    public IsActive: boolean;
    public IsDeleted: boolean;
    public Email: string;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public PageNumber: number;
    public ItemsOnPage: number;
    public SearchText: string;
    public MaxPageItems: number;
    public NextPage: string;
    public PreviousPage: string;
    public SortDirection: string;
    public SortField: string;
    public users: Array< UserDto>;
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
class UserDto {
    public Id: number;
    public IsActive: boolean;
    public IsDeleted: boolean;
    public Email: string;
    public UserName: string;
    public UserDetailsDto: UserDetailsDto;

}
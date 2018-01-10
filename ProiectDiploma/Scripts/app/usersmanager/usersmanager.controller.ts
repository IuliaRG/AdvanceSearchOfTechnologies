class UsersManagerController {
    protected UsersManagerVM: UsersManagerModel;
    protected PageVM: PageModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected iUserRoleService: IUserRoleService;
    protected PaginationVM: PaginationModel;
    public UserData: Array<UserDto>
  
    constructor(iLocalStorageService: ILocalStorageService,iUserRoleService:IUserRoleService,iDataService: IDataService,$window: ng.IWindowService, $http: ng.IHttpService) {
       
        this.httpService = $http;
        this.iDataService = iDataService;
        this.iUserRoleService = iUserRoleService;
        this.UsersManagerVM = new UsersManagerModel();
        this.PageVM = new PageModel();
        this.PaginationVM = new PaginationModel();
   //    this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
       this.iUserRoleService.CheckUser("Admin","usermanager");
        this.Pagination();


    }
    protected GetUsersCallback(data: any, self: UsersManagerController): void {
        
        // self.UsersManagerVM.users = users;
       
        self.PageVM.FromUsersDto(data);
       
        
        
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
    public users: Array<any>;
   // public UserDetailsDto: UserDetailsDto;
 
    constructor() {
        this.users = new Array<UserDto>();
    }
    public FromUsersDto(data: any): void {
        debugger
        this.PageNumber = data.PageNumber;
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.PreviousPage = data.PreviousPage;
        
     
        var models: any = data.Data.map(dto => ((new UserModel()).FromUserDto(dto)));
        this.SortField = data.SortField;
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
    public Roles: any;
    public UserDetailsDto: UserDetailsDto;

}
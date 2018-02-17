class UsersManagerController {
   // protected UsersManagerVM: UsersManagerModel;
    protected PageVM: PageModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected iUserRoleService: IUserRoleService;
    protected PaginationVM: PaginationModel;
    public UserData: Array<UserDto>
    protected iWindowService: ng.IWindowService;
    constructor(iLocalStorageService: ILocalStorageService,iUserRoleService:IUserRoleService,iDataService: IDataService,$window: ng.IWindowService, $http: ng.IHttpService) {
       
        this.httpService = $http;
        this.iDataService = iDataService;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
       // this.UsersManagerVM = new UsersManagerModel();
        this.PageVM = new PageModel();
        this.PaginationVM = new PaginationModel();
     // this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
       this.iUserRoleService.CheckUser("Admin","usermanager");
        this.Pagination();


    }
    protected GetUsersCallback(data: any, self: UsersManagerController): void {
        self.PageVM.FromUsersDto(data);
    }

    protected Pagination(itemsNumber?: number)
    {
        
        var self = this;
        this.PageVM.ItemsOnPage = itemsNumber;
        var pageDto = {
            "PageNumber": self.PageVM.PageNumber,
            "ItemsOnPage": self.PageVM.ItemsOnPage,
            "SearchText": self.PageVM.SearchText,
            "SortDirection": self.PageVM.SortDirection,
            "SortField": self.PageVM.SortField,
        };
        self.iDataService.PostCallback('api/User/Page', pageDto, this, this.GetUsersCallback);

    }
    
    protected DeleteUser(id: number) {
        if (confirm("Are you sure to delete ")) {
           // this.iWindowService.location.href = '/index.html#!/usersmanager';
                this.iDataService.Delete('api/User/Delete/', id, this, this.GetUsersCallback);
                
            }
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
    public CurrentPage: string;
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
    
        this.PageNumber = data.PageNumber;
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
       
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.PreviousPage = data.PreviousPage;
        this.users = data.Data.map( dto => ((new UserModel()).FromUserDto(dto)));
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
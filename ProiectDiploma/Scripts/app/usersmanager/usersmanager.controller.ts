class UsersManagerController {
    // protected UsersManagerVM: UsersManagerModel;
    protected PageVM: PageModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected users: Array<any>;
    protected iUserRoleService: IUserRoleService;
    public UserData: Array<UserDto>
    protected iWindowService: ng.IWindowService;
    constructor(iLocalStorageService: ILocalStorageService, iUserRoleService: IUserRoleService, iDataService: IDataService, $window: ng.IWindowService, $http: ng.IHttpService) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        this.PageVM = new PageModel();
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.Pagination();
    }
    protected GetUsersCallback(data: any, self: UsersManagerController): void {
        self.PageVM.FromUsersDto(data);
    }

    protected Pagination(itemsNumber?: number, pageNumber?:number) {
        var self = this;
        this.PageVM.ItemsOnPage = itemsNumber;
        this.PageVM.PageNumber = pageNumber;
        var pageDto = {
            "PageNumber": self.PageVM.PageNumber,
            "ItemsOnPage": self.PageVM.ItemsOnPage,
            "SearchText": self.PageVM.SearchText,
            "SortDirection": self.PageVM.SortDirection,
            "SortField": self.PageVM.SortField,
            "CurrentPage": self.PageVM.CurrentPage,
        };
        self.iDataService.PostCallback('api/User/Page', pageDto, this, this.GetUsersCallback);
    }

    protected DeleteUser(id: string) {
        var self = this;
        if (confirm("Are you sure to delete ")) {
            self.Pagination();
            for (var i = 0; i < this.PageVM.users.length; i++) {
             
                if (self.PageVM.users[i].Id == id) {
                    
                    var pageDto = {
                        "PageNumber": self.PageVM.PageNumber,
                        "ItemsOnPage": self.PageVM.ItemsOnPage,
                        
                    };
                    self.PageVM.users.splice(i, 1);
                    self.iDataService.Delete('api/User/Delete/', id, this);
                    self.iDataService.PostCallback('api/User/Page', pageDto, this, this.GetUsersCallback);
                   
                    break;
                }
            }

        }
    }
}
class PageModel {
    public Id: string;
    public IsActive: boolean;
    public IsDeleted: boolean;
    public Email: string;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public CurrentPage: number;
    public PageNumber: number;
    public ItemsOnPage: number;
    public SearchText: string;
    public MaxPageItems: number;
    public NextPage: string;
    public PreviousPage: string;
    public SortDirection: string;
    public SortField: string;
    public LastPage: string;
    public users: Array<any>;
    constructor() {
        this.users = new Array<UserDto>();
    }
    public FromUsersDto(data: any): any {
        this.Id = data.Id;
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.LastPage = data.LastPage;
        this.users = data.Data.map(dto => ((new UserModel()).FromUserDto(dto)));
        this.SortField = data.SortField;
        return this;
    }
}



class UsersManagerController {
    protected PageVM: PageModel;
    protected httpService: ng.IHttpService;
    protected iUserService: IUserService;
    protected iUserRoleService: IUserRoleService;
    protected iWindowService: ng.IWindowService;
    protected users: Array<any>;

    constructor(iLocalStorageService: ILocalStorageService, iUserRoleService: IUserRoleService, iUserService: IUserService, $window: ng.IWindowService, $http: ng.IHttpService) {
        this.httpService = $http;
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.initialize();
        this.iUserRoleService = iUserRoleService;
        this.PageVM = new PageModel();
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.users = null;
        this.Pagination();
    }
    protected GetUsersCallback(data: any, self: UsersManagerController): void {
        self.PageVM.FromUsersDto(data);
        self.users = self.PageVM.users;
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
        self.iUserService.GetPageItems('api/User/UsersPage', pageDto, this, this.GetUsersCallback);
    }
    protected DeleteUser(id: string) {
        var self = this;
        if (confirm("Are you sure to delete ")) {
            self.iUserService.DeleteUser('api/User/Delete/', id, this, this.DeleteUserCallback);
        }
    }
    protected DeleteUserCallback( self: UsersManagerController): void {
        self.Pagination();
    }
    public initialize(): void {
        var self = this;
        setTimeout(function () {
         
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
           self.loadScript('bootshop.js');
            self.loadBoostrapScript('bootstrap.min.css');
           
            self.loadCssScript('base.css');
        }, 1000);

    }
    public loadBoostrapScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/bootshop/' + path;
        head.appendChild(script);
    }
    public loadScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    }
    public loadCssScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/css/' + path;
        head.appendChild(script);
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



class CurrentUserDetailsController {
    private CurrentUserDetailsVM: CurrentUserDetailsModel;
    private iUserService: IUserService;
    protected iLocalStorageService: ILocalStorageService;
    private iWindowService: ng.IWindowService;
    protected currentUser: CurrentUserModel;
    protected ProductVM: StorePageModel;
    protected iProductService: IProductService;
    private route: any;
    constructor(iLocalStorageService: ILocalStorageService, iProductService: IProductService, iUserService: IUserService, $window: ng.IWindowService,  $http: ng.IHttpService) {
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.ProductVM = new StorePageModel();
        this.iLocalStorageService = iLocalStorageService;
        this.CurrentUserDetailsVM = new CurrentUserDetailsModel();
        this.currentUser = this.iLocalStorageService.GetCurrentUser();
        this.iProductService = iProductService;
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        }
        this.iUserService.GetCurrentUser("api/User/CurrentUser", config, this, this.GetUsersCallback);
        this.Meniu();
    }
    protected Meniu( category?: string, brand?: string) {
        var self = this;
        
        self.ProductVM.Brand = brand;
        self.ProductVM.Category = category;
        var pageDto = {
          

            "Brand": self.ProductVM.Brand,
            "Category": self.ProductVM.Category,
        };

        self.iProductService.GetPageProducts('api/Product/ProductPage', pageDto, this, this.GetMeniuCallback);
    }
    protected GetMeniuCallback(data: any, self: CurrentUserDetailsController): void {
        self.ProductVM.FromProductsDto(data);
   
        self.loadBootstrap();
    }
    public loadBootstrap(): void {
        var self = this;
        setTimeout(() => {
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        });
    }
    public loadScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    }
    protected GetUsersCallback(user: UserDto, self: CurrentUserDetailsController): void {
        self.CurrentUserDetailsVM.FromCurrentUserDto(user);
    }
  
    protected EditCurrentUser(): void {
        var self = this;
        if (self.validatePhone(self.CurrentUserDetailsVM.Phone)==false) {
            self.CurrentUserDetailsVM.ErrorMessage = "Please enter a 10 digit number";
            self.CurrentUserDetailsVM.ShowError = true;
            return;
        }
        var userDto = {
            "Email": self.CurrentUserDetailsVM.Email,
            "UserDetailsDto": {
                "FirstName": self.CurrentUserDetailsVM.FirstName,
                "LastName": self.CurrentUserDetailsVM.LastName,
                "Address": self.CurrentUserDetailsVM.Address,
                "City": self.CurrentUserDetailsVM.LastName,
                "District": self.CurrentUserDetailsVM.District,
                "Country": self.CurrentUserDetailsVM.Country,            
                "Sex": self.CurrentUserDetailsVM.Sex,
                  "Phone": self.CurrentUserDetailsVM.Phone

            }
        };
        self.iUserService.UserUpdate('api/User/AddOrUpdate', userDto, this);
        self.iWindowService.location.href = '/index.html#!/home';
    }
    protected validatePhone(phone): boolean {
        var phoneValidation = /^\+?\d{10}$/;
        return phoneValidation.test(phone);
    }
}
class CurrentUserDetailsModel {
    public Email: string;
    public FirstName: string;
    public LastName: string;
    public Address: string;
    public City: string;
    public District: string;
    public Country: string;
    public Phone: any;
    public ErrorMessage: string;
    public Sex: string;
    public ShowError: boolean;
    public users: UserDto;
    constructor() {
    }
    public FromCurrentUserDto(dto: any): CurrentUserDetailsModel {
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
        this.City = dto.UserDetailsDto.City;
        this.District = dto.UserDetailsDto.District;
        this.Country = dto.UserDetailsDto.Country;
        this.Phone ="0"+ dto.UserDetailsDto.Phone;
        this.Sex = dto.UserDetailsDto.Sex;
        return this;
    }
}


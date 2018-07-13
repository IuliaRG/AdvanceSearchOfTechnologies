class RegisterController extends LogInController {
    public RegisterVM: RegisterModel;
    protected httpService: ng.IHttpService;
    protected iAccountService: IAccountService;
    protected iProductService: IProductService;
    protected ProductVM: StorePageModel;
    constructor(iLocalStorageService: ILocalStorageService, iProductService: IProductService, iAccountService: IAccountService, iUserService: IUserService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService, iAccountService, iUserService, $window, $http);
        this.httpService = $http;
        this.RegisterVM = new RegisterModel();
        this.iProductService = iProductService;
        this.ProductVM = new StorePageModel();
        this.Meniu();
    }
    public UserRegister(): void {
        var self = this;
        self.RegisterVM.ShowError = false;
     
        if (self.RegisterVM.Email == null) {
            self.RegisterVM.ErrorMessage = "Your Email field can't be blank!";
            self.RegisterVM.ShowError = true;
            return;
        }
        if (self.RegisterVM.Password == null) {
            self.RegisterVM.ErrorMessage = "Your Password field can't be blank!";
            self.RegisterVM.ShowError = true;
            return;
        }
        if (self.RegisterVM.ConfirmPassword == null) {
            self.RegisterVM.ErrorMessage = "Your ConfirmPassword field can't be blank!";
            self.RegisterVM.ShowError = true;
            return;
        }
        if (self.RegisterVM.Password !== self.RegisterVM.ConfirmPassword) {
            self.RegisterVM.ErrorMessage = "The password must be the same!";
            self.RegisterVM.ShowError = true;
            return;
        }

        if (self.validateEmail(self.RegisterVM.Email) !== true) {
            self.RegisterVM.ErrorMessage = "Email address is not valid!";
            self.RegisterVM.ShowError = true;
            return;
        }
      
        if (self.validatePassword(self.RegisterVM.Password) !== true) {
            self.RegisterVM.ErrorMessage = "Password is not valid!";
            self.RegisterVM.ShowError = true;
            return;
        }
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "contentType": "application/json"
            }
        };
        var userDto = {
            "Email": self.RegisterVM.Email,
            "Password": self.RegisterVM.Password,
            "ConfirmPassword": self.RegisterVM.ConfirmPassword
        };
        self.iAccountService.UserRegister('api/Account/Register', config, userDto, this, this.SuccessCallback, this.ErrorCallback);
    }
    protected SuccessCallback(user: RegisterModel, self: RegisterController): void {
        self.RegisterVM.ErrorMessage = "Your has been successfully register.Plese check your email address and confirm your email";
        self.RegisterVM.ShowError = true;
    }
    protected Meniu(itemsNumber?: number, pageNumber?: number, category?: string, brand?: string) {
        var self = this;
        self.ProductVM.ItemsOnPage = itemsNumber;
        self.ProductVM.PageNumber = pageNumber;
        self.ProductVM.Brand = brand;
        self.ProductVM.Category = category;
        var pageDto = {


            "Brand": self.ProductVM.Brand,
            "Category": self.ProductVM.Category,
        };

        self.iProductService.GetPageProducts('api/Product/ProductPage', pageDto, this, this.GetMeniuCallback);
    }
    protected GetMeniuCallback(data: any, self: RegisterController): void {
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
}
class RegisterModel {
    public Email: string;
    public Password: string;
    public ConfirmPassword: string;
    public ErrorMessage: string;
    public ShowError: boolean;

}
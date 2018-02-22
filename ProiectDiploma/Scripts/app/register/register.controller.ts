class RegisterController extends LogInController {
    public RegisterVM: RegisterModel;
    protected httpService: ng.IHttpService;
    protected iAccountService: IAccountService;
    constructor(iLocalStorageService: ILocalStorageService, iAccountService: IAccountService, iUserService: IUserService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService, iAccountService, iUserService, $window, $http);
        this.httpService = $http;
        this.RegisterVM = new RegisterModel();
    }
    public UserRegister(): void {
        var self = this;
        self.RegisterVM.ShowError = false;
        if (self.RegisterVM.Email == null) {
            self.RegisterVM.ErrorMessage = "Your Email field cannot be blank!";
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
}
class RegisterModel {
    public Email: string;
    public Password: string;
    public ConfirmPassword: string;
    public ErrorMessage: string;
    public ShowError: boolean;

}
class RegisterController extends LogInController{
    public RegisterVM: RegisterModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    constructor(iLocalStorageService:ILocalStorageService,iDataService: IDataService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService,iDataService, $window, $http);
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
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        self.httpService.post('api/Account/Register', {
            "Email": self.RegisterVM.Email,
            "Password": self.RegisterVM.Password,
            "ConfirmPassword": self.RegisterVM.ConfirmPassword,
        }).then(function (response) {
            self.RegisterVM.ErrorMessage = "Your has been successfully register.Plese check your email address and confirm your email";
            self.RegisterVM.ShowError = true;
            }).catch(function (response) {
            self.RegisterVM.ErrorMessage = response.data.Message;
        });
    }
}

class RegisterModel {
    public Email: string;
    public Password: string;
    public ConfirmPassword: string;
    public ErrorMessage: string;
    public ShowError: boolean;

}
class ForgotPasswordController extends LogInController{
    public ForgotPassworVM: ForgotPasswordModel;
    protected httpService: ng.IHttpService;
    protected iAccountService: IAccountService;
    protected route: any;
    constructor(iLocalStorageService: ILocalStorageService, iAccountService: IAccountService, iUserService: IUserService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService, iAccountService, iUserService, $window, $http);
        this.httpService = $http;
        this.route = $routeParams;
        this.ForgotPassworVM = new ForgotPasswordModel();
    }
    public SendLinkForPassword(): void {
        var self = this;
        self.ForgotPassworVM.ShowError = false;
        if (self.ForgotPassworVM.Email == null) {
            self.ForgotPassworVM.ErrorMessage = "Your Email field cannot be blank!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }

        if (self.validateEmail(self.ForgotPassworVM.Email) !== true) {
            self.ForgotPassworVM.ErrorMessage = "Email address is not valid!";
            self.ForgotPassworVM.ShowError = true;
            return;
        }
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "contentType": "application/json"
            }
        };
        var userDto = {
            "Email": self.ForgotPassworVM.Email
        };
        self.iAccountService.ForgotPassword('api/Account/ForgotPassword', config, userDto, this, this.SuccessCallback);
    }
    protected SuccessCallback(user: ForgotPasswordModel, self: ForgotPasswordController): void {
        self.ForgotPassworVM.ErrorMessage = "Check your email address!";
        self.ForgotPassworVM.ShowError = true;
    }
}
class ForgotPasswordModel {
    public Email: string;
    public ErrorMessage: string;
    public ShowError: boolean;
}

class ResetPasswordController extends LogInController{
    protected ResetPassworVM: ResetPasswordModel;
    protected httpService: ng.IHttpService;
    protected iAccountService: IAccountService;
    protected route: any;
    constructor(iLocalStorageService: ILocalStorageService, iAccountService: IAccountService, iUserService: IUserService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService, iAccountService, iUserService, $window, $http);
        this.route = $routeParams;
        this.httpService = $http;
        this.ResetPassworVM = new ResetPasswordModel();
        this.ResetPassworVM.Email = this.route.username;
    }
    protected ResetPassword(): void {
        var self = this;
        self.ResetPassworVM.ShowError = false;
        if (self.ResetPassworVM.Email == null) {
            self.ResetPassworVM.ErrorMessage = "Your Email field cannot be blank!";
            self.ResetPassworVM.ShowError = true;
            return;
        }

        if (self.ResetPassworVM.NewPassword !== self.ResetPassworVM.ConfirmPassword) {
            self.ResetPassworVM.ErrorMessage = "The password must be the same!";
            self.ResetPassworVM.ShowError = true;
            return;
        }

        if (self.validateEmail(self.ResetPassworVM.Email) !== true) {
            self.ResetPassworVM.ErrorMessage = "Email address is not valid!";
            self.ResetPassworVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.ResetPassworVM.NewPassword) !== true) {
            self.ResetPassworVM.ErrorMessage = "Password is not valid!";
            self.ResetPassworVM.ShowError = true;
            return;
        }
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "contentType": "application/json"
            }
        };
        var userDto = {
            "Email": self.route.username,
            "NewPassword": self.ResetPassworVM.NewPassword,
            "ConfirmPassword": self.ResetPassworVM.ConfirmPassword,
        };
        self.iAccountService.ResetPassword('api/Account/ResetPassword', config, userDto, this, this.SuccessCallback);
    }
    protected SuccessCallback(user: ResetPasswordModel, self: ResetPasswordController): void {
        self.iWindowService.location.href = '/index.html#!/login';
        self.ResetPassworVM.ErrorMessage = "Your password has been successfully reset";
        self.ResetPassworVM.ShowError = true;
    }
}

class ResetPasswordModel {
    public Email: string;
    public NewPassword: string;
    public ConfirmPassword: string;
    public ErrorMessage: string;
    public ShowError: boolean;
}
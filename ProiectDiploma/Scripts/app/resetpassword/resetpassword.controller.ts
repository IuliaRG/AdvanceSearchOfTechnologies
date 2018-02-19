class ResetPasswordController extends LogInController{
    protected ResetPassworVM: ResetPasswordModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected route: any;
    constructor(iLocalStorageService:ILocalStorageService,iDataService: IDataService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService,iDataService, $window, $http);
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
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        self.httpService.post('api/Account/ResetPassword', {
            "Email": self.route.username,
            "NewPassword": self.ResetPassworVM.NewPassword,
            "ConfirmPassword": self.ResetPassworVM.ConfirmPassword,
        }).then(function (response) {
            self.iWindowService.location.href = '/index.html#!/login';
            self.ResetPassworVM.ErrorMessage = "Your password has been successfully reset";

        }).catch(function (response) {
            self.ResetPassworVM.ErrorMessage = response.data.Message;
        });
    }
}

class ResetPasswordModel {
    public Email: string;
    public NewPassword: string;
    public ConfirmPassword: string;
    public ErrorMessage: string;
    public ShowError: boolean;
}
class ForgotPasswordController extends LogInController{
    public ForgotPassworVM: ForgotPasswordModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected route: any;
    constructor(iLocalStorageService:ILocalStorageService,iDataService: IDataService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService,iDataService, $window, $http);
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
                "dataType": "json",
                "contentType": "application/json"
            }
        };
        this.httpService.post('api/Account/ForgotPassword', {
            "Email": self.ForgotPassworVM.Email,
        }).then(function (response) {
            self.ForgotPassworVM.ErrorMessage = "Check your email address";
            self.ForgotPassworVM.ShowError = true;
        }).catch(function (response) {
            self.ForgotPassworVM.ErrorMessage = response.data.Message;
        });

    }
}
class ForgotPasswordModel {
    public Email: string;
    public ErrorMessage: string;
    public ShowError: boolean;
}

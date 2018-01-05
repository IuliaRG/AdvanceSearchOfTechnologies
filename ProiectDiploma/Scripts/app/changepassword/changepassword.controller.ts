class ChangePasswordController extends LogInController{
    public ChangePassworVM: ChangePasswordModel;
    protected httpService: ng.IHttpService;
    protected iDataService: IDataService;
    protected route: any;
    constructor(iLocalStorageService:ILocalStorageService,iDataService: IDataService, $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService,iDataService, $window, $http);
        this.httpService = $http;
       
        this.route = $routeParams;
        this.ChangePassworVM = new ChangePasswordModel();
       
    }

    public ChangePasswordClick(): void {
        var self = this;
        self.ChangePassworVM.ShowError = false;
       

        if (self.ChangePassworVM.NewPassword !== self.ChangePassworVM.ConfirmPassword) {
            self.ChangePassworVM.ErrorMessage = "The password must be the same!";
            self.ChangePassworVM.ShowError = true;
            return;
        }

        if (self.validatePassword(self.ChangePassworVM.NewPassword) !== true) {
            self.ChangePassworVM.ErrorMessage = "Password is not valid!";
            self.ChangePassworVM.ShowError = true;
            return;
        }

        var config: angular.IRequestShortcutConfig = {
            headers: {
                "dataType": "json",
                "contentType": "application/json"

            }
        };

        this.httpService.post('api/Account/ChangePassword', {
            "Password": self.ChangePassworVM.Password,
            "NewPassword": self.ChangePassworVM.NewPassword,
            "ConfirmPassword": self.ChangePassworVM.ConfirmPassword,
        }).then(function (response) {
            self.ChangePassworVM.ErrorMessage = "Your password has been successfully change";

        }).catch(function (response) {
            self.ChangePassworVM.ErrorMessage = response.data.Message;
        });
     
    }

   
}

class ChangePasswordModel {
    public Password: string;
    public NewPassword: string;
    public ConfirmPassword: string;
    public ErrorMessage: string;
    public ShowError: boolean;
   
}
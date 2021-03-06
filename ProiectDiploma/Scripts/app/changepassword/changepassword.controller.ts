﻿class ChangePasswordController extends LogInController{
    public ChangePassworVM: ChangePasswordModel;
    protected httpService: ng.IHttpService;
    protected iAccountService: IAccountService=null;
    protected route: any;
    protected currentUser: CurrentUserModel;
    constructor(iLocalStorageService: ILocalStorageService, iAccountService: IAccountService, iUserService: IUserService,  $window: ng.IWindowService, $routeParams: ng.RouteData, $http: ng.IHttpService) {
        super(iLocalStorageService, iAccountService, iUserService, $window, $http);
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
        this.currentUser = this.iLocalStorageService.GetCurrentUser();
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        }
        this.httpService.post('api/Account/ChangePassword',{
            "OldPassword": self.ChangePassworVM.OldPassword,
            "NewPassword": self.ChangePassworVM.NewPassword,
            "ConfirmPassword": self.ChangePassworVM.ConfirmPassword,
        }, config).then(function (response) {
            self.ChangePassworVM.ErrorMessage = "Your password has been successfully change";

        }).catch(function (response) {
            self.ChangePassworVM.ErrorMessage = response.data.Message;
        });
    }
}

class ChangePasswordModel {
    public OldPassword: string;
    public NewPassword: string;
    public ConfirmPassword: string;
    public ErrorMessage: string;
    public ShowError: boolean;
   
}
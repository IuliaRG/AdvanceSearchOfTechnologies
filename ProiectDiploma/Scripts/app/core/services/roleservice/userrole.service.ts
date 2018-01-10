interface IUserRoleService {
    CheckUser(name: string, url: string): any;
   
}
class UserRoleService implements IUserRoleService {

    private iHttpService: ng.IHttpService;
    private iWindowService: ng.IWindowService;
    private iLocalStorageService: ILocalStorageService;
    private currentUser: CurrentUserModel;
    constructor($http: ng.IHttpService, $window: ng.IWindowService, iLocalStorageService: ILocalStorageService) {
        this.iHttpService = $http;
        this.iWindowService = $window;
        this.iLocalStorageService = iLocalStorageService;
    }
    public CheckUser( name:string,urlName:string):any
    {
        var self = this;

        self.currentUser = this.iLocalStorageService.GetCurrentUser();
        var config: angular.IRequestShortcutConfig = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        }

        this.iHttpService .get('api/User/GetRole', config).then(function (response: any) {
           self.currentUser.role = response.data.Roles;
           if (self.currentUser.role.indexOf(name) == -1) {
               self.iWindowService.location.href = '/index.html#!/' + urlName;
            }

        }).catch(function (response) {

        });
    }
   
}

var UsersManagerController = (function () {
    function UsersManagerController(iLocalStorageService, iUserRoleService, iUserService, $window, $http) {
        this.httpService = $http;
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.initialize();
        this.iUserRoleService = iUserRoleService;
        this.PageVM = new PageModel();
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.users = null;
        this.Pagination();
    }
    UsersManagerController.prototype.GetUsersCallback = function (data, self) {
        self.PageVM.FromUsersDto(data);
        self.users = self.PageVM.users;
    };
    UsersManagerController.prototype.Pagination = function (itemsNumber, pageNumber) {
        var self = this;
        this.PageVM.ItemsOnPage = itemsNumber;
        this.PageVM.PageNumber = pageNumber;
        var pageDto = {
            "PageNumber": self.PageVM.PageNumber,
            "ItemsOnPage": self.PageVM.ItemsOnPage,
            "SearchText": self.PageVM.SearchText,
            "SortDirection": self.PageVM.SortDirection,
            "SortField": self.PageVM.SortField,
            "CurrentPage": self.PageVM.CurrentPage,
        };
        self.iUserService.GetPageItems('api/User/UsersPage', pageDto, this, this.GetUsersCallback);
    };
    UsersManagerController.prototype.DeleteUser = function (id) {
        var self = this;
        if (confirm("Are you sure to delete ")) {
            self.iUserService.DeleteUser('api/User/Delete/', id, this, this.DeleteUserCallback);
        }
    };
    UsersManagerController.prototype.DeleteUserCallback = function (self) {
        self.Pagination();
    };
    UsersManagerController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
            self.loadBoostrapScript('bootstrap.min.css');
            self.loadCssScript('base.css');
        }, 1000);
    };
    UsersManagerController.prototype.loadBoostrapScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/bootshop/' + path;
        head.appendChild(script);
    };
    UsersManagerController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    UsersManagerController.prototype.loadCssScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/css/' + path;
        head.appendChild(script);
    };
    return UsersManagerController;
}());
var PageModel = (function () {
    function PageModel() {
        this.users = new Array();
    }
    PageModel.prototype.FromUsersDto = function (data) {
        this.Id = data.Id;
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.LastPage = data.LastPage;
        this.users = data.Data.map(function (dto) { return ((new UserModel()).FromUserDto(dto)); });
        this.SortField = data.SortField;
        return this;
    };
    return PageModel;
}());
//# sourceMappingURL=usersmanager.controller.js.map
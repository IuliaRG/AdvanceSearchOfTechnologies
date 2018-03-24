var UsersManagerController = (function () {
    function UsersManagerController(iLocalStorageService, iUserRoleService, iUserService, $window, $http) {
        this.httpService = $http;
        this.iUserService = iUserService;
        this.iWindowService = $window;
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
var UsersManagerController = (function () {
    function UsersManagerController(iLocalStorageService, iUserRoleService, iDataService, $window, $http) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        // this.UsersManagerVM = new UsersManagerModel();
        this.PageVM = new PageModel();
        // this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.Pagination();
    }
    UsersManagerController.prototype.GetUsersCallback = function (data, self) {
        self.PageVM.FromUsersDto(data);
    };
    UsersManagerController.prototype.DeleteUser = function (id) {
        var self = this;
        if (confirm("Are you sure to delete ")) {
            self.Pagination();
            //this.PageVM.users = this.PageVM.users.filter(function (UserModel) {
            //    return UserModel.Id !== id;
            //});
            for (var i = 0; i < this.PageVM.users.length; i++) {
                if (self.PageVM.users[i].Id == id) {
                    var pageDto = {
                        "PageNumber": self.PageVM.PageNumber,
                        "ItemsOnPage": self.PageVM.ItemsOnPage,
                    };
                    self.iDataService.Delete('api/User/Delete/', id, this);
                    self.iDataService.PostCallback('api/User/Page', pageDto, this, this.GetUsersCallback);
                    self.PageVM.users.splice(i, 1);
                    break;
                }
            }
        }
    };
    UsersManagerController.prototype.Pagination = function (itemsNumber) {
        var self = this;
        this.PageVM.ItemsOnPage = itemsNumber;
        var pageDto = {
            "PageNumber": self.PageVM.PageNumber,
            "ItemsOnPage": self.PageVM.ItemsOnPage,
            "SearchText": self.PageVM.SearchText,
            "SortDirection": self.PageVM.SortDirection,
            "SortField": self.PageVM.SortField,
        };
        self.iDataService.PostCallback('api/User/Page', pageDto, this, this.GetUsersCallback);
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
        this.PreviousPage = data.PreviousPage;
        this.users = data.Data.map(function (dto) { return ((new UserModel()).FromUserDto(dto)); });
        this.SortField = data.SortField;
        return this;
    };
    return PageModel;
}());
//# sourceMappingURL=usersmanager.controller.js.map
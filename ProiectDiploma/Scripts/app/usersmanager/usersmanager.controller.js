var UsersManagerController = (function () {
    function UsersManagerController(iLocalStorageService, iUserRoleService, iDataService, $window, $http) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.iWindowService = $window;
        this.iUserRoleService = iUserRoleService;
        // this.UsersManagerVM = new UsersManagerModel();
        this.PageVM = new PageModel();
        this.PaginationVM = new PaginationModel();
        // this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.Pagination();
    }
    UsersManagerController.prototype.GetUsersCallback = function (data, self) {
        self.PageVM.FromUsersDto(data);
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
    UsersManagerController.prototype.DeleteUser = function (id) {
        if (confirm("Are you sure to delete ")) {
            // this.iWindowService.location.href = '/index.html#!/usersmanager';
            this.iDataService.Delete('api/User/Delete/', id, this, this.GetUsersCallback);
        }
    };
    return UsersManagerController;
}());
var PageModel = (function () {
    // public UserDetailsDto: UserDetailsDto;
    function PageModel() {
        this.users = new Array();
    }
    PageModel.prototype.FromUsersDto = function (data) {
        this.PageNumber = data.PageNumber;
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.CurrentPage = data.CurrentPage;
        this.PreviousPage = data.PreviousPage;
        this.users = data.Data.map(function (dto) { return ((new UserModel()).FromUserDto(dto)); });
        this.SortField = data.SortField;
    };
    return PageModel;
}());
var PageDto = (function () {
    function PageDto() {
    }
    return PageDto;
}());
var UserDetailsDto = (function () {
    function UserDetailsDto() {
    }
    return UserDetailsDto;
}());
var PaginationModel = (function () {
    function PaginationModel() {
    }
    return PaginationModel;
}());
var UserDto = (function () {
    function UserDto() {
    }
    return UserDto;
}());
//# sourceMappingURL=usersmanager.controller.js.map
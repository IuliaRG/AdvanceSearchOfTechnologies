var UsersManagerController = (function () {
    function UsersManagerController(iLocalStorageService, iUserRoleService, iDataService, $window, $http) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.iUserRoleService = iUserRoleService;
        this.UsersManagerVM = new UsersManagerModel();
        this.PageVM = new PageModel();
        this.PaginationVM = new PaginationModel();
        //    this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
        this.iUserRoleService.CheckUser("Admin", "usermanager");
        this.Pagination();
    }
    UsersManagerController.prototype.GetUsersCallback = function (data, self) {
        // self.UsersManagerVM.users = users;
        self.PageVM.FromUsersDto(data);
    };
    UsersManagerController.prototype.Pagination = function () {
        var self = this;
        var pageDto = {
            "PageNumber": self.PaginationVM.PageNumber,
            "ItemsOnPage": self.PaginationVM.ItemsOnPage,
        };
        self.iDataService.PostCallback('api/User/Page', pageDto, this, this.GetUsersCallback);
    };
    UsersManagerController.prototype.SetItemsPerPage = function (itemsNumber) {
        this.PaginationVM.ItemsOnPage = itemsNumber;
        this.Pagination();
    };
    return UsersManagerController;
}());
var UsersManagerModel = (function () {
    function UsersManagerModel() {
        this.users = new Array();
    }
    return UsersManagerModel;
}());
var PageModel = (function () {
    // public UserDetailsDto: UserDetailsDto;
    function PageModel() {
        this.users = new Array();
    }
    PageModel.prototype.FromUsersDto = function (data) {
        debugger;
        this.PageNumber = data.PageNumber;
        this.ItemsOnPage = data.ItemsOnPage;
        this.SearchText = data.SearchText;
        this.MaxPageItems = data.MaxPageItems;
        this.NextPage = data.NextPage;
        this.PreviousPage = data.PreviousPage;
        var models = data.Data.map(function (dto) { return ((new UserModel()).FromUserDto(dto)); });
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
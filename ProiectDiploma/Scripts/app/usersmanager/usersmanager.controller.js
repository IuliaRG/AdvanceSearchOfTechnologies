var UsersManagerController = (function () {
    function UsersManagerController(iDataService, $window, $http) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.UsersManagerVM = new UsersManagerModel();
        this.PaginationVM = new PaginationModel();
        //this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
        this.Pagination();
    }
    UsersManagerController.prototype.GetUsersCallback = function (users, self) {
        self.UsersManagerVM.users = users;
        //self.UsersManagerVM.FromUsersDto(users);
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
var UserDto = (function () {
    function UserDto() {
    }
    return UserDto;
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
//# sourceMappingURL=usersmanager.controller.js.map
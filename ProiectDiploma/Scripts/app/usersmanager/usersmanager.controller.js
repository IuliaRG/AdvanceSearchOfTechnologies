var UsersManagerController = (function () {
    function UsersManagerController(iDataService, $window, $http) {
        this.httpService = $http;
        this.iDataService = iDataService;
        this.UsersManagerVM = new UsersManagerModel();
        this.PageVM = new PageModel();
        this.PaginationVM = new PaginationModel();
        //this.iDataService.Get("api/User/GetAll", this, this.GetUsersCallback);
        this.Pagination();
    }
    UsersManagerController.prototype.GetUsersCallback = function (users, self) {
        // self.UsersManagerVM.users = users;
        console.log(users.ItemsOnPage);
        self.PageVM.FromUsersDto(users);
        console.log(self.PageVM.users);
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
    }
    PageModel.prototype.FromUsersDto = function (dto) {
        this.Id = dto.Id;
        this.users = dto.users;
        //this.FirstName = dto.UserDto.UserDetailsDto.FirstName;
        //this.LastName = dto.UserDto.UserDetailsDto.LastName;
        //this.Email = dto.Email;
        //this.UserName = dto.UserName;
        this.ItemsOnPage = dto.ItemsOnPage;
        this.PageNumber = dto.PageNumber;
        this.MaxPageItems = dto.MaxPageItems;
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
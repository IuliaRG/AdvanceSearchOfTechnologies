var CurrentUserDetailsController = (function () {
    function CurrentUserDetailsController(iLocalStorageService, iProductService, iUserService, $window, $http) {
        this.iUserService = iUserService;
        this.iWindowService = $window;
        this.ProductVM = new StorePageModel();
        this.iLocalStorageService = iLocalStorageService;
        this.CurrentUserDetailsVM = new CurrentUserDetailsModel();
        this.currentUser = this.iLocalStorageService.GetCurrentUser();
        this.iProductService = iProductService;
        var config = {
            headers: {
                "Authorization": 'Bearer ' + this.currentUser.token,
            }
        };
        this.iUserService.GetCurrentUser("api/User/CurrentUser", config, this, this.GetUsersCallback);
        this.Meniu();
    }
    CurrentUserDetailsController.prototype.Meniu = function (category, brand) {
        var self = this;
        self.ProductVM.Brand = brand;
        self.ProductVM.Category = category;
        var pageDto = {
            "Brand": self.ProductVM.Brand,
            "Category": self.ProductVM.Category,
        };
        self.iProductService.GetPageProducts('api/Product/ProductPage', pageDto, this, this.GetMeniuCallback);
    };
    CurrentUserDetailsController.prototype.GetMeniuCallback = function (data, self) {
        self.ProductVM.FromProductsDto(data);
        self.loadBootstrap();
    };
    CurrentUserDetailsController.prototype.loadBootstrap = function () {
        var self = this;
        setTimeout(function () {
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
        });
    };
    CurrentUserDetailsController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    CurrentUserDetailsController.prototype.GetUsersCallback = function (user, self) {
        self.CurrentUserDetailsVM.FromCurrentUserDto(user);
    };
    CurrentUserDetailsController.prototype.EditCurrentUser = function () {
        var self = this;
        if (self.validatePhone(self.CurrentUserDetailsVM.Phone) == false) {
            self.CurrentUserDetailsVM.ErrorMessage = "Please enter a 10 digit number";
            self.CurrentUserDetailsVM.ShowError = true;
            return;
        }
        var userDto = {
            "Email": self.CurrentUserDetailsVM.Email,
            "UserDetailsDto": {
                "FirstName": self.CurrentUserDetailsVM.FirstName,
                "LastName": self.CurrentUserDetailsVM.LastName,
                "Address": self.CurrentUserDetailsVM.Address,
                "City": self.CurrentUserDetailsVM.LastName,
                "District": self.CurrentUserDetailsVM.District,
                "Country": self.CurrentUserDetailsVM.Country,
                "Sex": self.CurrentUserDetailsVM.Sex,
                "Phone": self.CurrentUserDetailsVM.Phone
            }
        };
        self.iUserService.UserUpdate('api/User/AddOrUpdate', userDto, this);
        self.iWindowService.location.href = '/index.html#!/home';
    };
    CurrentUserDetailsController.prototype.validatePhone = function (phone) {
        var phoneValidation = /^\+?\d{10}$/;
        return phoneValidation.test(phone);
    };
    return CurrentUserDetailsController;
}());
var CurrentUserDetailsModel = (function () {
    function CurrentUserDetailsModel() {
    }
    CurrentUserDetailsModel.prototype.FromCurrentUserDto = function (dto) {
        this.Address = dto.UserDetailsDto.Address;
        this.Email = dto.Email;
        this.FirstName = dto.UserDetailsDto.FirstName;
        this.LastName = dto.UserDetailsDto.LastName;
        this.City = dto.UserDetailsDto.City;
        this.District = dto.UserDetailsDto.District;
        this.Country = dto.UserDetailsDto.Country;
        this.Phone = "0" + dto.UserDetailsDto.Phone;
        this.Sex = dto.UserDetailsDto.Sex;
        return this;
    };
    return CurrentUserDetailsModel;
}());
//# sourceMappingURL=currentuserdetails.controller.js.map
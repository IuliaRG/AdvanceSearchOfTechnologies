﻿class LogInController {
    protected iDataService: IDataService;
    public req: any;
    public LoginVM: LogInModel;
    constructor(iDataService: IDataService, $window: ng.IWindowService) {
        this.iDataService = iDataService;
        this.LoginVM = new LogInModel();
    }
  
    public LogInClick(): void {
        var self = this;
        self.LoginVM.ShowError = false;
        if (self.LoginVM.Email == null) {
            self.LoginVM.ErrorMessage = "Your Email field cannot be blank!";

            self.LoginVM.ShowError = true;
            return;
        }
        if (self.validateEmail(self.LoginVM.Email) == false) {
            self.LoginVM.ErrorMessage = "Email address is not valid!";
            self.LoginVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.LoginVM.Password) == false) {
            self.LoginVM.ErrorMessage = "Password is not valid!";
            self.LoginVM.ShowError = true;
            return;
        }
        console.log(self.LoginVM.Email);
        var dto: LogInDto = new LogInDto(this.LoginVM.Email, this.LoginVM.Password);
        var req = {
            method: 'POST',
            url: '/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'grant_type=password' + '&' + 'username=' + this.LoginVM.Email + '&' + 'password=' + this.LoginVM.Password
        }
        self.iDataService.LogIn( req, self);

    }

    protected PostUsersCallback(users: any, self: LogInController): void {
        var user: UserLogInModel = new UserLogInModel();
        user.token = users.access_token;
        user.email = users.userName;
        user.tokenType = users.token_type;

    }
    protected ErrorCallback(error): void {
        var response = JSON.parse(error.responseText);
        var self = this;
        self.LoginVM.ErrorMessage = response.Message;
        self.LoginVM.ShowError = true;

    }
    protected validateEmail(email): boolean {
        var emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailValidation.test(email);

    }
    protected validatePassword(password): boolean {
        var passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;;
        
        return passwordValidation.test(password);

    }
}
class UserLogInModel {
    public email: string;
    public usernamename: string;
    public token: string;
    public tokenType: string;
}
class LogInModel {
    public Email: string;
    public Password: string;
    public ErrorMessage: string;
    public ShowError: boolean;
    constructor() { }
}

class LogInDto {
    public grant_type: string = 'password';
    public username: string;
    public password: string;
    constructor(email: string, password: string) {
        this.username = email;
        this.password = password;
    }
}
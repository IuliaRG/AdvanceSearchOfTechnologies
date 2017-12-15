class LogInController {
    protected _iDataService: IDataService;
    protected data: any;
    public LoginVM: LogInModel;
    constructor(iDataService: IDataService, $window: ng.IWindowService, $http: ng.IHttpService) {

       
        this._iDataService = iDataService;
       
        this.LoginVM = new LogInModel();
        
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
    public LoginClick(): void {

        var self = this;
        var dto: LogInDto = new LogInDto(this.LoginVM.Email, this.LoginVM.Password);
        var data = JSON.stringify(dto);
        
        self.LoginVM.ShowError = false;
        if (self.LoginVM.Email == null) {
            self.LoginVM.ErrorMessage = "Your Email field cannot be blank!";
            self.LoginVM.ShowError = true;
            return;
        }
        if (self.validateEmail(self.LoginVM.Email )==false) {
            self.LoginVM.ErrorMessage = "Email address is not valid!";
            self.LoginVM.ShowError = true;
            return;
        }
        if (self.validatePassword(self.LoginVM.Password) == false) {
            self.LoginVM.ErrorMessage = "Password is not valid!";
            self.LoginVM.ShowError = true;
            return;
        }
        this._iDataService.Post("/token", this.data, this, this.PostUsersCallback);
        
    }
    protected validateEmail(email): boolean {
        var emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailValidation.test(email);

    }
    protected validatePassword(password): boolean {
        var passwordValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
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
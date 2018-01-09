interface ILocalStorageService {
    SetCurrentUser(name: string, data: any): any;
    GetCurrentUser()
}
class LocalStorageService implements ILocalStorageService {
    
    public SetCurrentUser( name:string,data:any):any
    {

        localStorage.setItem(name, data);
    }
    public GetCurrentUser(): any {
     
        return <CurrentUserModel>JSON.parse(localStorage.currentUser);
    }
}
class CurrentUserModel {
    public email: string;
    public name: string;
    public isAdmin: boolean;
    public token: string;
    public tokenType: string;
    public role:Array<string>;
}
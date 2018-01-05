interface ILocalStorageService {
    SetCurrentUser(name: string, data: any):any;
}
class LocalStorageService implements ILocalStorageService {
    
    public SetCurrentUser( name:string,data:any):any
    {
        localStorage.setItem(name, data);
        if (localStorage.getItem(name) != null) {
            localStorage.currentUser = JSON.parse(localStorage.getItem(name));

        }
    }
   
   }
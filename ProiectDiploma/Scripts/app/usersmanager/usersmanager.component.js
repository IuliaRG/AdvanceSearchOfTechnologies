'use strict';
angular.
    module('usersmanager').
    component('usersmanager', {
    templateUrl: 'scripts/app/usersmanager/usersmanager.template.html',
    controller: ['ILocalStorageService', 'IUserRoleService', 'IDataService', '$window', '$scope', '$http', UsersManagerController]
});
//# sourceMappingURL=usersmanager.component.js.map
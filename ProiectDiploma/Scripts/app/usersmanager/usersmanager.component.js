'use strict';
angular.
    module('home').
    component('home', {
    templateUrl: 'scripts/app/usersmanager/usersmanager.template.html',
    controller: ['IDataService', '$window', '$scope', '$http', UsersManagerController]
});
//# sourceMappingURL=usersmanager.component.js.map
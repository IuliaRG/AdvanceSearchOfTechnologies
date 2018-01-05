'use strict';
angular.
    module('login').
    component('login', {
    templateUrl: 'scripts/app/login/login.template.html',
    controller: ['ILocalStorageService', 'IDataService', '$window', '$http', LogInController]
});
//# sourceMappingURL=login.component.js.map
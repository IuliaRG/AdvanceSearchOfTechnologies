'use strict';
angular.
    module('register').
    component('register', {
    templateUrl: 'scripts/app/register/register.template.html',
    controller: ['ILocalStorageService', 'IDataService', '$window', '$routeParams', '$http', RegisterController]
});
//# sourceMappingURL=register.component.js.map
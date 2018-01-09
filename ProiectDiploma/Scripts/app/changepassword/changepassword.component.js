'use strict';
angular.
    module('changepassword').
    component('changepassword', {
    templateUrl: 'scripts/app/changepassword/changepassword.template.html',
    controller: ['ILocalStorageService', 'IDataService', '$window', '$routeParams', '$http', ChangePasswordController]
});
//# sourceMappingURL=changepassword.component.js.map
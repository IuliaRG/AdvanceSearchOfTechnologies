'use strict';
angular.
    module('forgotpassword').
    component('forgotpassword', {
    templateUrl: 'scripts/app/forgotpassword/forgotpassword.template.html',
    controller: ['ILocalStorageService', 'IAccountService', '$window', '$routeParams', '$http', ForgotPasswordController]
});
//# sourceMappingURL=forgotpassword.component.js.map
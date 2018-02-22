'use strict';

angular.
    module('resetpassword').
    component('resetpassword', {
        templateUrl: 'scripts/app/resetpassword/resetpassword.template.html',
        controller: ['ILocalStorageService', 'IAccountService','IUserService', '$window', '$routeParams', '$http', ResetPasswordController]
    });
'use strict';

angular.
    module('forgotpassword').
    component('forgotpassword', {
        templateUrl: 'scripts/app/forgotpassword/forgotpassword.template.html',
        controller: ['IDataService', '$window', '$routeParams', '$http', ForgotPasswordController]
    });
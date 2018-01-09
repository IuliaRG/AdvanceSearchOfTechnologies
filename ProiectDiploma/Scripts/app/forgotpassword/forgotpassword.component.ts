﻿'use strict';

angular.
    module('forgotpassword').
    component('forgotpassword', {
        templateUrl: 'scripts/app/forgotpassword/forgotpassword.template.html',
        controller: ['ILocalStorageService','IDataService', '$window', '$routeParams', '$http', ForgotPasswordController]
    });
﻿'use strict';

angular.
    module('changepassword').
    component('changepassword', {
        templateUrl: 'scripts/app/changepassword/changepassword.template.html',
        controller: ['ILocalStorageService','IAccountService','IUserService', '$window', '$routeParams', '$http', ChangePasswordController]
    });
﻿'use strict';

angular.
    module('register').
    component('register', {
        templateUrl: 'scripts/app/register/register.template.html',
        controller: ['ILocalStorageService', 'IAccountService','IUserService', '$window', '$routeParams', '$http', RegisterController]
    });
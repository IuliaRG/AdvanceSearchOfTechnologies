﻿'use strict';

angular.
    module('login').
    component('login', {
        templateUrl: 'scripts/app/login/login.template.html',
        controller: ['ILocalStorageService', 'IUserService','IAccountService','IUserService', '$window','$http', LogInController]
    });
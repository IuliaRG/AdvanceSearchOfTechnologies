'use strict';

angular.
    module('login').
    component('login', {
        templateUrl: 'scripts/app/login/login.template.html',
        controller: ['ILocalStorageService', 'IAccountService','IUserService', '$window','$http', LogInController]
    });
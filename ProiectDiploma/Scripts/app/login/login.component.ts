'use strict';

angular.
    module('login').
    component('login', {
        templateUrl: 'scripts/app/login/login.template.html',
        controller: ['IDataService', '$window', LogInController]
    });
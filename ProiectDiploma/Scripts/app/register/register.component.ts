'use strict';

angular.
    module('register').
    component('register', {
        templateUrl: 'scripts/app/register/register.template.html',
        controller: ['IDataService', '$window', '$routeParams', '$http', RegisterController]
    });
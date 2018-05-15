'use strict';

angular.
    module('userdetails').
    component('userdetails', {
        templateUrl: 'scripts/app/userdetails/userdetails.template.html',
        controller: ['ILocalStorageService','IUserService', '$window', '$routeParams', '$http','IUserRoleService', UserDetailsController]
    });
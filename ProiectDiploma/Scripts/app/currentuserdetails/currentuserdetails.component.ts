'use strict';

angular.
    module('currentuserdetails').
    component('currentuserdetails', {
        templateUrl: 'scripts/app/currentuserdetails/currentuserdetails.template.html',
        controller: ['ILocalStorageService','IUserService','$window','$http', CurrentUserDetailsController]
    });
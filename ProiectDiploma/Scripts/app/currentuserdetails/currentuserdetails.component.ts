'use strict';

angular.
    module('currentuserdetails').
    component('currentuserdetails', {
        templateUrl: 'scripts/app/currentuserdetails/currentuserdetails.template.html',
        controller: ['ILocalStorageService','IProductService','IUserService','$window','$http', CurrentUserDetailsController]
    });
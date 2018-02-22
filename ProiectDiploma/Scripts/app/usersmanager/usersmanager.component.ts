﻿'use strict';

angular.
    module('usersmanager').
    component('usersmanager', {
        templateUrl: 'scripts/app/usersmanager/usersmanager.template.html',
        controller: ['ILocalStorageService', 'IUserRoleService','IUserService', '$window', '$scope','$http',UsersManagerController]
    });
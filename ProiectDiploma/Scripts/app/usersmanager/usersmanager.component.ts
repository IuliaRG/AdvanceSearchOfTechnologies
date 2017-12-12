'use strict';

angular.
    module('usersmanager').
    component('usersmanager', {
        templateUrl: 'scripts/app/usersmanager/usersmanager.template.html',
        controller: ['IDataService', '$window', '$scope','$http',UsersManagerController]
    });
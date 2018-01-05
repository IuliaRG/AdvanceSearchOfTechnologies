'use strict';

angular.
    module('changepassword').
    component('changepassword', {
        templateUrl: 'scripts/app/changepassword/changepassword.template.html',
        controller: ['IDataService', '$window', '$routeParams', '$http', ChangePasswordController]
    });
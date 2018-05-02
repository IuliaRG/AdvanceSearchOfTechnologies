'use strict';

angular.
    module('addproduct').
    component('addproduct', {
        templateUrl: 'scripts/app/addproduct/addproduct.template.html',
        controller: ['ILocalStorageService', 'IUserRoleService', 'IProductService', '$window', '$scope', '$http', AddProductController]
    });
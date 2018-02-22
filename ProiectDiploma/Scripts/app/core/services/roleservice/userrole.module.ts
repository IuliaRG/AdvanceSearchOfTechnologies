'use strict';

// Define the `core` module
angular.module('core.role', ['core.data', 'core.storage']).
    service('IUserRoleService', ['$http', '$window', 'ILocalStorageService', 'IUserService',UserRoleService]);
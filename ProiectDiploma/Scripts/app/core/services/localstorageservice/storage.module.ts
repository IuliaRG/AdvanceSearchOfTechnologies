'use strict';

// Define the `core` module
angular.module('core.storage', []).
    service('ILocalStorageService', [LocalStorageService]);
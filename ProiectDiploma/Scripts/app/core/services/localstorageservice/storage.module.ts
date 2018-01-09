'use strict';

// Define the `core` module
angular.module('core.storage', ['core.data']).
    service('ILocalStorageService', [LocalStorageService]);
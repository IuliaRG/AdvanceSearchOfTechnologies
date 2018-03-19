'use strict';

// Define the `core.phone` module
angular.module('core.product', ['ngRoute']).
    service('IProductService', ['$http', '$window', ProductService]);
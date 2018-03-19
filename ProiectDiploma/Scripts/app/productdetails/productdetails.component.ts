'use strict';

angular.
    module('productdetails').
    component('productdetails', {
        templateUrl: 'scripts/app/productdetails/productdetails.template.html',
        controller: ['IProductService', '$http', '$routeParams', ProductDetailsController]
    });
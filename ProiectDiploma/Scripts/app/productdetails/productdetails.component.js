'use strict';
angular.
    module('productdetails').
    component('productdetails', {
    templateUrl: 'scripts/app/productdetails/productdetails.template.html',
    controller: ['ILocalStorageService', '$window', 'IProductService', '$http', '$routeParams', ProductDetailsController]
});
//# sourceMappingURL=productdetails.component.js.map
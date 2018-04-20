'use strict';
angular.
    module('home').
    component('home', {
    templateUrl: 'scripts/app/home/home.template.html',
    controller: ['$scope', 'ILocalStorageService', 'IProductService', '$http', HomeController]
});
//# sourceMappingURL=home.component.js.map
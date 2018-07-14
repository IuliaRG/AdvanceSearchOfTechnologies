'use strict';
angular.
    module('home').
    component('home', {
    templateUrl: 'scripts/app/home/home.template.html',
    controller: ['$scope', 'ILocalStorageService', 'IUserService', 'IProductService', '$http', '$window', '$routeParams', HomeController]
});
//# sourceMappingURL=home.component.js.map
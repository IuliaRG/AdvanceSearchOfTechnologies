'use strict';
angular.
    module('store').
    component('store', {
    templateUrl: 'scripts/app/store/store.template.html',
    controller: ['$scope', 'ILocalStorageService', 'IProductService', '$http', '$window', StoreController]
});
//# sourceMappingURL=store.component.js.map
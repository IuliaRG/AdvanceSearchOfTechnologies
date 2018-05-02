'use strict';
angular.
    module('statistics').
    component('statistics', {
    templateUrl: 'scripts/app/statistics/statistics.template.html',
    controller: ['ILocalStorageService', 'IUserRoleService', 'IProductService', '$window', '$scope', '$http', StatisticsController]
});
//# sourceMappingURL=statistics.component.js.map
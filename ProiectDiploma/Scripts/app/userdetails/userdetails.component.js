'use strict';
angular.
    module('userdetails').
    component('userdetails', {
    templateUrl: 'scripts/app/userdetails/userdetails.template.html',
    controller: ['IUserService', '$window', '$routeParams', '$http', UserDetailsController]
});
//# sourceMappingURL=userdetails.component.js.map
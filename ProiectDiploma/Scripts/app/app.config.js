'use strict;';
angular.
    module('AdvanceSearchTechnologies').
    config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/home', {
            template: '<home></home>'
        }).
            when('/usersmanager', {
            template: '<usersmanager></usersmanager>'
        }).
            when('/login', {
            template: '<login></login>'
        }).
            otherwise('/home');
    }
]);
//# sourceMappingURL=app.config.js.map
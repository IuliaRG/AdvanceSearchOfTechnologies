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
            when('/login', {
            template: '<login></login>'
        }).
            when('/usersmanager', {
            template: '<usersmanager></usersmanager>'
        }).
            when('/userdetails', {
            template: '<userdetails></userdetails>'
        }).
            otherwise('/home');
    }
]);
//# sourceMappingURL=app.config.js.map
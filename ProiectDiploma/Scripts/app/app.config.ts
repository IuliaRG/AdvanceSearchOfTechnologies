'use strict;'

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
                otherwise('/home');
        }
    ]);
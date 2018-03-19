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
                when('/productdetails', {
                    template: '<productdetails></productdetails>'
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
                when('/forgotpassword', {
                    template: '<forgotpassword></forgotpassword>'
                }).
                when('/register', {
                    template: '<register></register>'
                }).
                when('/resetpassword', {
                    template: '<resetpassword></resetpassword>'
                }).
                when('/changepassword', {
                    template: '<changepassword></changepassword>'
                }).
              
                otherwise('/home');
        }
    ]); 
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
            when('/productdetails', {
            template: '<productdetails></productdetails>'
        }).
            when('/login', {
            template: '<login></login>'
        }).
            when('/addproduct', {
            template: '<addproduct></addproduct>'
        }).
            when('/statistics', {
            template: '<statistics></statistics>'
        }).
            when('/usersmanager', {
            template: '<usersmanager></usersmanager>'
        }).
            when('/chat', {
            template: '<chat></chat>'
        }).
            when('/usermanagerchat', {
            template: '<usermanagerchat></usermanagerchat>'
        }).
            when('/userdetails', {
            template: '<userdetails></userdetails>'
        }).
            when('/currentuserdetails', {
            template: '<currentuserdetails></currentuserdetails>'
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
//# sourceMappingURL=app.config.js.map
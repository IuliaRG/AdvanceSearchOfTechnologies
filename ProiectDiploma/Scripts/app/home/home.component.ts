﻿'use strict';

angular.
    module('home').
    component('home', {
        templateUrl: 'scripts/app/home/home.template.html',
        controller: ['$scope', 'ILocalStorageService', 'IProductService', '$http','$window',HomeController]
    });
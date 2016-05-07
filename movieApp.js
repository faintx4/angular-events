(function(){
    'use strict';

    angular
        .module('movieApp', ['ui.router'])
        .constant('AppName', 'View Series Part')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home',
                    views: {
                        main: {
                            templateUrl: 'templates/main.html',
                            controller: 'MainCtrl'
                        },
                        'series@home': {
                            templateUrl: 'templates/series-list.html',
                            controller: 'SeriesController'
                        },
                        'parts@home': {
                            templateUrl: 'templates/part-list.html',
                            controller: 'PartsController'
                        }
                    }
                })
        }])
        .controller('MainCtrl', ['$scope', '$http', 'AppName', function($scope, $http, AppName) {
            $scope.appName = AppName;
            $scope.$on('movieChange', function(event, obj) {
                $scope.$broadcast('switchMovie', obj);
            });
        }])
        .controller('SeriesController', ['$scope', '$http', function($scope, $http) {
            $http.get('mocks/series.json').then(function(response) {
                $scope.series = response.data;
            });

            $scope.changeID = function changeID() {
                $scope.$emit('movieChange', {'id': this.s.id, 'title': this.s.title});
            };

        }])
        .controller('PartsController', ['$scope', "$http", function($scope, $http) {
            $scope.$on('switchMovie', function(event, movie) {
                $scope.movieTitle = movie.title;
                $scope.episodes = [];

                $http.get('mocks/parts.json').then(function(response) {

                    for (var i = 0; i < response.data.length; i++) {
                        if ( movie.id === response.data[i].id ) {
                            $scope.episodes = response.data[i].episodes;
                        }
                    }

                });
            });
        }]);
}());

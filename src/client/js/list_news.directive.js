(function() {
    'use strict';

    angular.module('app')
        .directive('listNews', listNews)
        ;

    function listNews() {
        var directive = {
            restrict: 'EAC',
            templateUrl: 'js/list_news.directive.html',
            scope: {
                date: '=',
                index: '='
            },
            controller: listNewsController,
            controllerAs: 'vm',
            bindToController: false // because the scope is isolated
        };

        return directive;
    }

    listNewsController.$inject = ['$scope', 'STServices', '$rootScope'];
    function listNewsController($scope, STServices, $rootScope) {
        var vm = this;

        vm.selectNews = selectNews;
        vm.init = init;

        function init() {
            vm.response = '';
            vm.loading = true;
            vm.date = $scope.date;
            vm.index = $scope.index;

            getNews($scope.index, $scope.date);
        }

        function getNews(index, dateEvent) {
            beginLoading();
            STServices.getNews(index, dateEvent)
                .then(function(res) {
                    vm.data = res;
                    if (angular.equals({}, vm.data)) {
                        vm.nodata = true;
                    } else {
                        vm.currentNews = vm.data[0];
                        vm.currentNews.index = 0;
                    }
                    updateNewsFlag(vm.currentNews.date);
                    endLoading();
                });
        }

        function selectNews(news, index) {
            vm.currentNews = news;
            vm.currentNews.index = index;
        }

        function updateNewsFlag(date) {
            $rootScope.$broadcast('app.flags.news', date);
        }

        function beginLoading() {
            vm.loading = true;
            vm.nodata = false;
        }

        function endLoading() {
            vm.loading = false;
        }

        $scope.$on('news.load', function(event, date) {
            getNews($scope.index, date);
        });

        $scope.$on('timeline.events', function(event) {
            beginLoading();
        })

        init();
    }
})();

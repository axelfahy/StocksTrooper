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

    listNewsController.$inject = ['$scope', 'STServices'];
    function listNewsController($scope, STServices) {
        var vm = this;

        vm.selectNews = selectNews;
        vm.init = init;

        function init() {
            vm.response = '';
            vm.loading = true;
            vm.date = $scope.date;
            vm.index = $scope.index;
            console.log($scope.date);

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
                    endLoading();
                });
        }

        function selectNews(news, index) {
            vm.currentNews = news;
            vm.currentNews.index = index;
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


        init();
    }
})();

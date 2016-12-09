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
                data: '='
            },
            controller: listNewsController,
            controllerAs: 'vm',
            bindToController: false // because the scope is isolated
        };

        return directive;
    }

    listNewsController.$inject = ['$scope'];
    function listNewsController($scope) {
        var vm = this;

        vm.selectNews = selectNews;
        vm.init = init;

        function init() {
            vm.response = '';
            vm.loading = false;
            vm.data = $scope.data;
            if (angular.equals({}, vm.data)) {
                vm.nodata = true;
            } else {
                vm.currentNews = vm.data[0];
                vm.currentNews.index = 0;
            }
        }

        function selectNews(news, index) {
            vm.currentNews = news;
            vm.currentNews.index = index;
        }

        init();
    }
})();

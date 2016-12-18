(function() {
    'use strict';

    angular.module('app')
        .directive('stTimeline', stTimeline)
        ;

    function stTimeline() {
        var directive = {
            restrict: 'EAC',
            templateUrl: 'js/timeline.directive.html',
            scope: {
                index: '=',
                dateStart: '=',
                dateEnd: '='
            },
            controller: timelineController,
            controllerAs: 'vm',
            bindToController: false // because the scope is isolated
        };

        return directive;
    }

    timelineController.$inject = ['$scope', '$rootScope', 'STServices'];
    function timelineController($scope, $rootScope, STServices) {
        var vm = this;

        vm.init = init;
        vm.chooseEvent = chooseEvent;
        vm.getEvents = getEvents;

        function init() {
            getEvents($scope.index, $scope.dateStart, $scope.dateEnd);
        }

        function chooseEvent(currentEvent) {
            vm.currentEvent = currentEvent.date;
            $rootScope.$broadcast('news.load', currentEvent.date);
        }

        function getEvents(index, dateStart, dateEnd) {
            beginLoading();
            if (index !== undefined && dateStart !== undefined && dateEnd !== undefined) {
                STServices.getEvents(index, dateStart, dateEnd)
                    .then(function(res) {
                        vm.events = res;
                        chooseEvent(vm.events[0]);
                        endLoading();
                    });
            }
        }

        function beginLoading() {
            vm.loading = true;
        }

        function endLoading() {
            vm.loading = false;
        }

        $scope.$watch(['index', 'dateStart', 'dataEnd'], function(newValue, oldValue) {
            getEvents($scope.index, $scope.dateStart, $scope.dataEnd);
        });

        init();
    }
})();

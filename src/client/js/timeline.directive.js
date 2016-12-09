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
                data: '='
            },
            controller: timelineController,
            controllerAs: 'vm',
            bindToController: false // because the scope is isolated
        };

        return directive;
    }

    timelineController.$inject = ['$scope', '$rootScope'];
    function timelineController($scope, $rootScope) {
        var vm = this;

        vm.init = init;
        vm.chooseEvent = chooseEvent;

        function init() {
            console.log($scope.data);
            vm.events = $scope.data;
        }

        function chooseEvent(currentEvent) {
            $rootScope.$broadcast('news.load', currentEvent.date);
        }

        init();
    }
})();

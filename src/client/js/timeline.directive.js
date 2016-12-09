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

    timelineController.$inject = ['$scope'];
    function timelineController($scope) {
        var vm = this;

        vm.init = init;

        function init() {
        }

        init();
    }
})();

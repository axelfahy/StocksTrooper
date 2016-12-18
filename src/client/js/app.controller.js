(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['STServices', '$scope', '$translate', '$timeout'];

    function AppController(STServices, $scope, $translate, $timeout) {
        var vm = this;

        vm.loadEvents = loadEvents;
        vm.getStocks = getStocks;
        vm.isValid = isValid;
        vm.changeLanguage = changeLanguage;

        /**
        Initialisation function
        */
        function init() {
            vm.lang = 'en';
            vm.loading = true;
            vm.welcome = true;
            vm.picker = {
                index: '',
                valid: undefined
            };
        }

        function clean() {
            delete vm.currentIndex;
            delete vm.currentEvent;
            delete vm.events;
            delete vm.news;
        }

        ///////////////////////////////////////////////////////////////////////

        function getStocks(index) {
            clean();
            vm.welcome = false;
            vm.loading = true;
            STServices.getStocks(index)
                .then(function(res) {
                    vm.currentIndex = index;
                    vm.loading = false;

                    if ($scope.chartConfig === undefined) {
                        $scope.chartConfig = {
                            options: {
                                chart: {
                                    zoomType: 'x'
                                },
                                rangeSelector: {
                                    enabled: true,
                                    selected: 4
                                },
                                navigator: {
                                    enabled: true
                                }
                            },
                            series: [
                                [],
                                [],
                                []
                            ],
                            title: {},
                            xAxis: {},
                            func: function(chart) {
                                $timeout(function() {
                                    chart.reflow();
                                }, 0);
                            },
                            useHighStocks: true
                        };
                    }

                    // Get the dates on correct format
                    var d = [];
                    for (var i = 0; i < res.length; i++) {
                        d.push([res[i][0] / 1000000, res[i][1]]);
                    }

                    $scope.chartConfig.series.push({
                        id: 0,
                        name: 'Stock price $',
                        data: d,
                        tooltip: {
                            valueDecimals: 2
                        }
                    });

                    vm.loadEvents(index, '20151209', '20161212');
                });
        }

        function loadEvents(index, dateStart, dateEnd) {
            vm.events = {
                index: index,
                dateStart: dateStart,
                dateEnd: dateEnd
            };
        }

        function isValid(index) {
            STServices.getValid(index)
                .then(function(res) {
                    vm.valid = res;
                });
        }

        function changeLanguage(lang) {
            vm.lang = lang;
            $translate.use(lang);
        }

        $scope.$on('app.flags.news', function(event, date) {
            $scope.chartConfig.series[0].push({
                type: 'flags',
                data: [{
                    x: Date.UTC(year, 1, 22),
                    title: 'A',
                    text: 'Shape: "squarepin"'
                }, {
                    x: Date.UTC(year, 3, 28),
                    title: 'A',
                    text: 'Shape: "squarepin"'
                }],
                onSeries: 'dataseries',
                shape: 'squarepin',
                width: 16
            });
        });

        $scope.$on('news.load', function(event, date) {
            vm.news = {
                currentEvent: date
            };
        });

        init();

        function dateToUTC(dt) {
            var y = dt.substring(0, 4);
            var m = dt.substring(4, 6);
            var d = dt.substring(6, 8);
            return Date.UTC(y, m, d);
        }
    }

})();

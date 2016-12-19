(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['STServices', '$scope', '$translate', '$timeout', '$rootScope'];

    function AppController(STServices, $scope, $translate, $timeout, $rootScope) {
        var vm = this;

        vm.loadEvents = loadEvents;
        vm.getStocks = getStocks;
        vm.isValid = isValid;
        vm.changeLanguage = changeLanguage;

        vm.chartConfig = {};

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

                    if (angular.equals({}, vm.chartConfig)) {
                        vm.chartConfig = {
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
                            series: [],
                            title: {},
                            xAxis: {
                                events: {
                                    setExtremes: function(e) {
                                        vm.loadEvents(index, Highcharts.dateFormat('%Y%m%d', e.min), Highcharts.dateFormat('%Y%m%d', e.max));
                                    }
                                }
                            },
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

                    vm.chartConfig.series.push({
                        id: 'dataseries',
                        name: 'Stock price $',
                        data: d,
                        tooltip: {
                            valueDecimals: 2
                        },
                        color: Highcharts.getOptions().colors[3]
                    });

                    if (index === 'fb') {
                        addSeriesOfFlags('fb');
                    }
                    vm.loadEvents(index, '20151216', '20161216');

                });
        }

        function loadEvents(index, dateStart, dateEnd) {
            vm.events = {
                index: index,
                dateStart: dateStart,
                dateEnd: dateEnd
            };
            $rootScope.$broadcast('timeline.events');
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

        function addSeriesOfFlags(date) {
            vm.chartConfig.series.push({
                type: 'flags',
                data: [{
                    x: Date.UTC(2016, 11 - 1, 2),
                    title: 'N',
                    text: 'News'
                }],
                shape: 'circlepin',
                width: 16
            });
            vm.chartConfig.series.push({
                type: 'flags',
                data: [{
                    x: Date.UTC(2015, 12 - 1, 31),
                    title: 'D',
                    text: 'Drop'
                }, {
                    x: Date.UTC(2016, 10 - 1, 31),
                    title: 'D',
                    text: 'Drop'
                }, {
                    x: Date.UTC(2016, 11 - 1, 14),
                    title: 'D',
                    text: 'Drop'
                }],
                onSeries: 'dataseries',
                color: 'red',
                shape: 'squarepin',
                width: 16
            });
            vm.chartConfig.series.push({
                type: 'flags',
                data: [{
                    x: Date.UTC(2016, 2 - 1, 1),
                    title: 'I',
                    text: 'Increase'
                }, {
                    x: Date.UTC(2016, 4 - 1, 27),
                    title: 'I',
                    text: 'Increase'
                }],
                onSeries: 'dataseries',
                color: 'green',
                shape: 'squarepin',
                width: 16
            });
        }

        // $scope.$on('app.flags.news', function(event, date) {
        //     // addSeriesOfFlags(date);
        //     // console.log(vm.chartConfig);
        //     // console.log(vm.chartConfig.xAxis);
        //     // console.log(vm.chartConfig.getHighcharts().axes[0].max);
        // });

        $scope.$on('news.load', function(event, date) {
            vm.news = {
                currentEvent: date
            };
        });

        init();
    }

})();

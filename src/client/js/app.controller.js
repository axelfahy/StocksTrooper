(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['STServices', '$scope'];

    function AppController(STServices, $scope) {
        var vm = this;

        vm.getEvents = getEvents;
        vm.getStocks = getStocks;
        vm.getNews = getNews;
        vm.isValid = isValid;

        $scope.chartConfig = {
            options: {
                chart: {
                    zoomType: 'x'
                },
                rangeSelector: {
                    enabled: true
                },
                navigator: {
                    enabled: true
                }
            },
            series: [],
            title: {
                // text: 'AAPL Stock Index'
            },
            xAxis: {
                title: {
                    text: 'AAPL'
                },
                // credits: {
                //     enabled: true
                // }
            },
            useHighStocks: true
        }

        function init() {
            vm.index = 'aapl';
            vm.getEvents(vm.index);
            // vm.getStocks(vm.index);
            vm.getNews(vm.index);
            vm.isValid(vm.index);
            vm.loading = true;
            vm.welcome = true;

            vm.events = [{
                badgeClass: 'success',
                badgeIconClass: 'glyphicon-arrow-up',
                // title: 'First heading',
                content: '20/01/2016'
            }, {
                badgeClass: 'danger',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            }, {
                badgeClass: 'danger',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            }, {
                badgeClass: 'success',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            }, {
                badgeClass: 'danger',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            }, ];


        }

        ///////////////////////////////////////////////////////////////////////
        // TODO Call the right services

        function getEvents(index) {
            // STServices.getEvents(i)
            vm.events = [{
                "date": "20160111"
            }, {
                "date": "20160212"
            }, {
                "date": "20160313"
            }];
        }

        function getStocks(index) {
            vm.welcome = false;
            vm.loading = true;
            STServices.getStocks(index)
                .then(function(res) {
                    vm.loading = false;
                    vm.currentIndex = index;
                    var d = [];
                    for (var i = 0; i < res.length; i++) {
                        d.push([res[i][0] / 1000000, res[i][1]]);
                    }
                    $scope.chartConfig.series.push({
                        id: 3,
                        data: d
                    });
                    console.log($scope.chartConfig.getHighcharts());
                });
        }

        function getNews(index) {
            vm.news = [{
                "headline": "Huge drop for apple",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vestibulum laoreet suscipit tristique.Donec suscipit velit id feugiat placerat.Ut eget egestas risus, at fermentum ipsum.",
                "date": "20160112",
                "source": "Reuters",
                "url": "http://www.reuters.com/?a=xT6sSPOe99"
            }];
        }

        function isValid(index) {
            STServices.getValid(index)
                .then(function(res) {
                    vm.valid = res;
                });
        }
        ///////////////////////////////////////////////////////////////////////

        init();
    }

})();

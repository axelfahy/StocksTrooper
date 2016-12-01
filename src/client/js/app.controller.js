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
                text: 'Hello'
            },
            useHighStocks: true
        }

        $scope.chartConfig.series.push({
                id: 1,
                data: [
                    [1147651200000, 23.15],
                    [1147737600000, 23.01],
                    [1147824000000, 22.73],
                    [1147910400000, 22.83],
                    [1147996800000, 22.56],
                    [1148256000000, 22.88],
                    [1148342400000, 22.79],
                    [1148428800000, 23.50],
                    [1148515200000, 23.74],
                    [1148601600000, 23.72],
                    [1148947200000, 23.15],
                    [1149033600000, 22.65]
                ]
            },   {
                id: 2,
                data: [
                    [1147651200000, 25.15],
                    [1147737600000, 25.01],
                    [1147824000000, 25.73],
                    [1147910400000, 25.83],
                    [1147996800000, 25.56],
                    [1148256000000, 25.88],
                    [1148342400000, 25.79],
                    [1148428800000, 25.50],
                    [1148515200000, 26.74],
                    [1148601600000, 26.72],
                    [1148947200000, 26.15],
                    [1149033600000, 26.65]
                ]

            }

        );

        function init() {
            vm.index = 'aapl';
            vm.getEvents(vm.index);
            vm.getStocks(vm.index);
            vm.getNews(vm.index);
            vm.isValid(vm.index);

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
            vm.events = [{
                "date": "20160111"
            }, {
                "date": "20160212"
            }, {
                "date": "20160313"
            }];
        }

        function getStocks(index) {
            vm.stocks = [{
                "date": "20160111",
                "value": 14.04
            }, {
                "date": "20160112",
                "value": 15.04
            }, {
                "date": "20160113",
                "value": 19.04
            }];
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

            // vm.valid = {
            //     "valid": true
            // };
        }
        ///////////////////////////////////////////////////////////////////////

        init();
    }

})();

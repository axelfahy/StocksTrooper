(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['STServices', '$scope', '$translate'];

    function AppController(STServices, $scope, $translate) {
        var vm = this;

        vm.getEvents = getEvents;
        vm.getStocks = getStocks;
        vm.getNews = getNews;
        vm.isValid = isValid;
        vm.changeLanguage = changeLanguage;

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
                // title: {
                    // text: 'AAPL'
                // },
                // credits: {
                //     enabled: true
                // }
            },
            useHighStocks: true
        };

        function init() {
            vm.lang = 'en';
            vm.loading = true;
            vm.welcome = true;
            vm.picker = {
                index: '',
                valid: undefined
            }
        }

        function clean() {
            delete vm.currentIndex;
            delete vm.currentEvent;
            delete vm.events;
            delete vm.news;
        }

        ///////////////////////////////////////////////////////////////////////
        function getEvents(index, dateStart, dateEnd) {
            STServices.getEvents(index, dateStart, dateEnd)
                .then(function(res) {
                    vm.events = res;
                    vm.getNews(index, vm.events[0].date);
                    vm.currentEvent = vm.events[0].date;
                });
        }

        function isValid(index) {
            // TODO check the validity of the index
            // STServices.getValid(index)
            //     .then(function(res) {
            //
            //     });
        }

        function getStocks(index) {
            clean();
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
                vm.getEvents(index, '20151209', '20161208');
                console.log($scope.chartConfig.getHighcharts());
            });
        }

        function getNews(index, dateEvent) {
            console.log(index);
            console.log(dateEvent);
            STServices.getNews(index, dateEvent)
                .then(function(res) {
                    console.log(res);
                    vm.news = res;
                });
            // vm.news = [{
            //     "headline": "Huge drop for apple",
            //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vestibulum laoreet suscipit tristique.Donec suscipit velit id feugiat placerat.Ut eget egestas risus, at fermentum ipsum.",
            //     "date": "20160112",
            //     "source": "Reuters",
            //     "url": "http://www.reuters.com/?a=xT6sSPOe99"
            // }];
        }

        function isValid(index) {
            STServices.getValid(index)
                .then(function(res) {
                    vm.valid = res;
                });
        }
        ///////////////////////////////////////////////////////////////////////

        function changeLanguage(lang) {
            vm.lang = lang;
            $translate.use(lang);
        }

        $scope.$on('news.load', function(event, date) {
            delete vm.news;
            vm.getNews(vm.currentIndex, date);
            vm.currentEvent = date;
        })

        init();
    }

})();

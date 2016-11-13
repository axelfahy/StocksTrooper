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
            },
            {
                badgeClass: 'danger',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            },
            {
                badgeClass: 'danger',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            },
            {
                badgeClass: 'success',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            },
            {
                badgeClass: 'danger',
                badgeIconClass: 'glyphicon-arrow-down',
                content: '25/02/2016'
            },
        ];
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
            vm.valid = {
                "valid": true
            };
        }
        ///////////////////////////////////////////////////////////////////////

        init();
    }

})();

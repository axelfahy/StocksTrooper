(function() {
    'use strict';

    angular
        .module('stockstrooper')
        .factory('STServices', STServices);

    STServices.$inject = ['$http', '$q'];
    function STServices($http, $q) {

        var services = {
            getEvents: getEvents,
            getStocks: getStocks,
            getNews: getNews,
            getValid: getValid
        };

        return services;


        ///////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////

        function getEvents(index, dateStart, dateEnd) {
            var deffered = $q.defer();

            // TODO : integrate dateStart and dateEnd

            $http.get(REST + '/events/' + index)
                .success(function(res) {
                    deffered.resolve(res);
                })
                .error(function(res) {
                    deffered.reject(res);
                });

            return deffered.promise;
        }

        ///////////////////////////////////////////////////////////////////////

        function getStocks(index) {
            var deffered = $q.defer();

            $http.get(REST + '/stocks/' + index)
                .success(function(res) {
                    deffered.resolve(res);
                })
                .error(function(res) {
                    deffered.reject(res);
                });

            return deffered.promise;
        }

        ///////////////////////////////////////////////////////////////////////

        function getNews(index, dateEvent) {
            var deffered = $q.defer();

            $http.get(REST + '/news/' + index + '/' + dateEvent)
                .success(function(res) {
                    deffered.resolve(res);
                })
                .error(function(res) {
                    deffered.reject(res);
                });

            return deffered.promise;
        }

        ///////////////////////////////////////////////////////////////////////

        function getValid(index) {
            var deffered = $q.defer();

            $http.get(REST + '/index/' + index)
                .success(function(res) {
                    deffered.resolve(res);
                })
                .error(function(res) {
                    deffered.reject(res);
                });

            return deffered.promise;
        }

        ///////////////////////////////////////////////////////////////////////


    }

})();

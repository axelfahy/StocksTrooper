(function() {
    'use strict';


    angular
        .module('app')
        .config(TranslateConfigurator);

    TranslateConfigurator.$inject = ['$translateProvider'];
    function TranslateConfigurator($translateProvider) {
            $translateProvider
                .translations('en', translationsEN)
                .translations('st', translationsST)
                .preferredLanguage('en')
                ;
    }

    var translationsEN = {
        PICKER: {
            BTN_INDEX: 'LOAD THE DATA',
            LABEL: 'INDEX PICKER'
        },
        CHART: {
            TITLE: '{{index}} INDEX HISTORY'
        },
        NEWS: {
            TITLE: 'NEWS RELEVANT TO THE EVENT'
        },
        EVENTS: {
            TITLE: 'EVENTS'
        }
    };

    var translationsST = {
        PICKER: {
            BTN_INDEX: 'USE THE FORCE',
            LABEL: 'PLANET PICKER'
        },
        CHART: {
            TITLE: 'HISTORY OF THE PLANET {{index}}'
        },
        NEWS: {
            TITLE: 'SECRET FILES OF BATTLE'
        },
        EVENTS: {
            TITLE: 'IMPORTANT BATTLES'
        }
    };

})();

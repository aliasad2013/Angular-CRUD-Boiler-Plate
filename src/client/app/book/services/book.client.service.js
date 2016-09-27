(function() {
    'use strict';

    angular
        .module('app.book')
        .factory('Book', Book);

    Book.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Book($resource, API_BASE_URL) {

        var params = {
            bookId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/book/:bookId';

        return $resource(API_URL, params, actions);

    }

})();

(function() {
    'use strict';

    angular
        .module('app.book')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listBook',
                config: {
                    url: '/book',
                    templateUrl: 'app/book/views/list.html',
                    controller: 'BookController',
                    controllerAs: 'vm',
                    title: 'List Books',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Books'
                    }
                }
            },
            {
                state: 'createBook',
                config: {
                    url: '/book/create',
                    templateUrl: 'app/book/views/create.html',
                    controller: 'BookController',
                    controllerAs: 'vm',
                    title: 'Create Book'
                }
            },
            {
                state: 'viewBook',
                config: {
                    url: '/book/:bookId',
                    templateUrl: 'app/book/views/view.html',
                    controller: 'BookController',
                    controllerAs: 'vm',
                    title: 'View Book'
                }
            },
            {
                state: 'editBook',
                config: {
                    url: '/book/:bookId/edit',
                    templateUrl: 'app/book/views/edit.html',
                    controller: 'BookController',
                    controllerAs: 'vm',
                    title: 'Edit Book'
                }
            }
        ];
    }
})();

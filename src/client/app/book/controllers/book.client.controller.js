(function () {
    'use strict';

    angular
        .module('app.book')
        .controller('BookController', BookController);

    BookController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Book',
        'TableSettings',
        'BookForm'];
    /* @ngInject */
    function BookController(logger,
        $stateParams,
        $location,
        Book,
        TableSettings,
        BookForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Book);
        vm.book = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = BookForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Book object
            var book = new Book(vm.book);

            // Redirect after save
            book.$save(function(response) {
                logger.success('Book created');
                $location.path('book/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Book
        vm.remove = function(book) {

            if (book) {
                book = Book.get({bookId:book.id}, function() {
                    book.$remove(function() {
                        logger.success('Book deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.book.$remove(function() {
                    logger.success('Book deleted');
                    $location.path('/book');
                });
            }

        };

        // Update existing Book
        vm.update = function() {
            var book = vm.book;

            book.$update(function() {
                logger.success('Book updated');
                $location.path('book/' + book.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewBook = function() {
            vm.book = Book.get({bookId: $stateParams.bookId});
            vm.setFormFields(true);
        };

        vm.toEditBook = function() {
            vm.book = Book.get({bookId: $stateParams.bookId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Book View');
        }
    }

})();

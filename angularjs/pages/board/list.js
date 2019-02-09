app.controller('board.list.ctrl', function ($sce, $scope, $rootScope, $window, $stateParams, boardService, headerService, appContextService, config, toastr, $log, $ngConfirm) {

    var vm = this;
    vm.appContext = appContextService.context;
    vm.config = config.site;

    vm.trustAsHtml = function (string) {
        return $sce.trustAsHtml(string);
    };

    vm.htmlToPlaintext = function (text) {
        let str = text ? String(text).replace(/<[^>]+>/gm, '') : '';
        str = str.replace(/&nbsp;/g, ' ');
        // str = str.substr(0, 300);
        return str;
    }



    vm.data = {
        "searchText": ""
    };


    vm.pagination = {
        maxSize: 5,
        totalItems: 0,
        currentPage: 1,
        itemsPerPage: 10,

    };

    vm.load = function (page) {

        boardService.list($stateParams.sub_menu, page, vm.pagination.itemsPerPage, vm.appContext.selectedMenu.isAscending ? 1 : -1, vm.data.searchText).then(
            function (res) {
                vm.items = res.data.list;
                vm.items.forEach(function(item) {
                    if (vm.appContext.selectedMenu.listStyle !== 'tab') {
                        item.content = vm.htmlToPlaintext(item.content);                        
                    }
                });
                vm.item = vm.items[0];
                if (vm.item) {
                    vm.tabId = vm.item._id;
                }
                vm.pagination.totalItems = res.data.count;
                if ($stateParams.sub_menu === 'related_links') {
                    vm.appContext.relatedLinks = vm.items;
                }
            },
            function (err) {
                console.log(err);
            }
        );
    }

    // initial load & reset
    vm.load(vm.currentPage);

    vm.pageChanged = function () {
        console.log('Page changed to: ' + vm.pagination.currentPage);
        vm.load(vm.pagination.currentPage);
    };

    vm.search = function () {
        vm.pagination.currentPage = 1;
        vm.load(vm.pagination.currentPage);
    }

    vm.reset = function () {
        vm.pagination.currentPage = 1;
        vm.data.searchText = "";
        vm.load(vm.pagination.currentPage);
    }

    vm.delete = function (item) {
        $ngConfirm({
            boxWidth: '30%',
            useBootstrap: false,
            title: 'Confirm',
            content: 'Delete it?',
            buttons: {
                confirm: {
                    text: 'Delete',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {
                        boardService.delete(item._id).then(
                            function (result) {
                                window.history.back();
                            },
                            function (err) {
                                console.log(err);
                            }
                        )
                    }
                },
                cancel: {
                    text: 'Cancel',
                    btnClass: 'btn-orange',
                },
            }
        });
    }
})
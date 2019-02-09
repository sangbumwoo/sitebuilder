app.controller('board.home.ctrl', function ($sce, $scope, $rootScope, $window, $stateParams, boardService, headerService, appContextService, config, toastr, $log, $ngConfirm) {

    console.log('HOME');

    var vm = this;
    vm.appContext = appContextService.context;
    vm.config = config.site;
    var layout;

    vm.getContents = function () {
        vm.contenstList.forEach(function (element, index) {
            // console.log('aaa', index, element)
            boardService.list(element.sub_menu, 1, 4, element.sort, '').then(
                function (res) {
                    if (res.data.list.length) {
                        element._id = res.data.list[0]._id;
                        element.title = res.data.list[0].title;
                        element.list = res.data.list;
                    }
                    if (index === vm.contenstList.length - 1) {
                        vm.contents = _.chunk(vm.contenstList, 2);
                    }

                },
                function (err) {
                    console.log(err);
                }
            );
        });
    }
    // vm.getContents();

    vm.getBanners = function (page) {
        vm.currentPage = page;
        boardService.list(layout.mainBanner, 1, 5, -1, '').then(
            function (results) {
                vm.slides = results.data.list;
                if (vm.slides.length) { }
            },
            function (err) {
                console.log(err);
            }
        );
        boardService.list(layout.linkBanner, 1, 100, -1, '').then(
            function (results) {
                vm.links = results.data.list;
            },
            function (err) {
                console.log(err);
            }
        );

    }
    // vm.getBanners(vm.currentPage);

    console.log('vm.appContext.lang', vm.appContext.lang);
    $scope.$watch('vm.appContext.lang', function (newVal, oldVal){
        console.log('$scope.$watch', newVal, oldVal)

        layout = config.langs[$window.localStorage.getItem('lang')].layout;
        vm.contenstList = layout.sections;

        vm.getContents();
        vm.getBanners(vm.currentPage);
    })

})
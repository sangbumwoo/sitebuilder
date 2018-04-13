app.controller('board.ctrl', function ($sce, $scope, $rootScope, $window, $stateParams, boardService, headerService, appContextService, toastr, config, $log, $ngConfirm) {

    console.log('board.js')
    var vm = this;
    vm.appContext = appContextService.context;
    vm.isHeaderEditing = false;

    var stack = [], node, ii;

    // console.log('vm.appContext.menuArray', vm.appContext.menuArray);

    stack.push(vm.appContext.menuArray);

    while (stack.length > 0) {
        node = stack.pop();
        // console.log('node', node);
        if (node.name == $stateParams.sub_menu) {
            // Found it!
            break;
        } else if (node.list && node.list.length) {
            for (ii = 0; ii < node.list.length; ii += 1) {
                stack.push(node.list[ii]);
            }
        }
    }
    console.log('Find at tree.... !!!!! ', node);
    vm.appContext.selectedMenu = node;
    // console.log('vm.appContext.menu', vm.appContext.menu)


    vm.saveHeaerText = function () {
        let data = {
            articleType: $stateParams.sub_menu,
            headerText: vm.headerText
        }
        // console.log('saveHeader', data);
        headerService.save(data).then(function (res) {
            getHeader();
            toastr.success('Header text saved');
            vm.toggleEditHeaderText();
        },
            function (err) {
                console.log(err);
            }
        )
    }

    vm.toggleEditHeaderText = function () {
        vm.isHeaderEditing = !vm.isHeaderEditing;
    }

    var getHeader = function () {
        vm.headerText = '';
        headerService.get($stateParams.sub_menu).then(function (res) {
            if (res.data) {
                vm.headerText = res.data.headerText;
                vm.headerTextDisplay = res.data.headerText;
            }
        },
            function (err) {
                console.log(err);
            }
        )
    }
    getHeader();

})
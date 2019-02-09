
app.controller('board.page.ctrl', function ($state, $sce, $scope, $rootScope, $window, $stateParams, boardService,  toastr, $location, $ngConfirm, appContextService, config) {

    var vm = this;
    vm.appContext = appContextService.context;
    vm.site = config.site;

    vm.trustAsHtml = function (string) {
        return $sce.trustAsHtml(string);
    };


    vm.delete = function (id) {

        $ngConfirm({
            boxWidth: '30%',
            useBootstrap: false,
            title: 'Delete confirm',
            content: 'Delete it?',
            scope: $scope,
            buttons: {
                confirm: {
                    text: 'delete',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {

                        boardService.delete(id).then(
                            function (result) {
                                // window.history.back();
                                getPage();
                            }, function (err) {
                                alert(err);
                            }
                        )

                    }
                },
                cancel: {
                    text: 'cancel',
                    btnClass: 'btn-orange',
                    // action: function (scope, button) {
                    // }
                },
            }
        });

    }

    var getPage = function() {
        boardService.getPage($stateParams.sub_menu).then(
            function (result) {
                vm.item = result.data;
                if (vm.item && vm.item.content) {
                    vm.item.content = vm.item.content.replace(/src="files/g, 'src="' + config.site.apiUrl + '/files/')
                }
            }, function (err) {
                console.log(err);
            }
        )
    }

    getPage();

    vm.data = {
        name: '',
        email: '',
        title: '',
        message: ''
    };

    if (vm.appContext.isLocalhost) {
        vm.data = {
            name: 'user',
            email: 'sbwoo87@gmail.com',
            title: 'title',
            message: 'message'
        };
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    vm.sendMail = function () {
        // vm.data; 
        console.log('sendMail....', vm.data)
        if (!validateEmail(vm.data.email)) {
            toastr.error('Email not valid');
            return;
        }
        if (!vm.data.name || !vm.data.title || !vm.data.message) {
            toastr.error('Field required');
            return;
        }
        // return;
        boardService.sendMail(vm.data).then(
            function (result) {
                console.log(result);
                // vm.item = result.data;
                // toastr.success('Mail has been sent successfully');
                alert('Mail has been sent successfully');
                $state.go('home');

            }, function (err) {
                console.log(err);
            }
        )
    }


})

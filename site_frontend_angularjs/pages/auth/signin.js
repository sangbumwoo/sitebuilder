app.controller('signin.ctrl', function ($scope, $window, $rootScope, $state, $stateParams, appContextService, userService, toastr, config) {

    var vm = this;
    vm.appContext = appContextService.context;

    vm.data = {
        email: $window.localStorage.getItem('email'),
        password: $window.localStorage.getItem('password')
    }

    // vm.lang = $window.localStorage.getItem('lang');
    // console.log('vm.lang', vm.lang);
    // // vm.appContext.menuArray = angular.copy(config.langs[vm.lang.code].menu);
    // console.log('config.langs', config.langs);
    // console.log('config.langs[vm.lang].menu', config.langs[vm.lang].menu);


    vm.signin = function () {

        if (!vm.data.email) {
            toastr.error("이메일을 입력해 주세요");
            return;
        }
        if (!vm.data.password) {
            toastr.error("암호를 입력해 주세요");
            return;
        }

        console.log('vm.data', vm.data)

        userService.signin(vm.data).then(
            function (result) {
                console.log('signin', result)
                var token = result.data.id_token;
                var payload = JSON.parse(atob(token.split('.')[1]));
                vm.appContext.user = payload;
                $window.localStorage.setItem('token', JSON.stringify(payload));
                // vm.appContext.menuArray = config.menuArray;
                // vm.appContext.menuArray = angular.copy(config.menu.list);
                vm.appContext.menuArray = angular.copy(config.langs[$window.localStorage.getItem('lang')].menu);

                $state.go('board.home', {main_menu: 'home'});

            },
            function (err) {
                console.log('signin error', err)
                toastr.error('signin error. Please try again.');
                // alert(JSON.stringify(err));
                // window.history.back();
                // $state.go('signin')
            }
        )

    }

    vm.signout = function () {
        $window.localStorage.removeItem('token');
        vm.appContext.user = null;
        vm.appContext.menuArray = angular.copy(config.langs[$window.localStorage.getItem('lang')].menu);

        console.log('vm.appContext.menuArray', vm.appContext.menuArray)
        _.remove(vm.appContext.menuArray.list, {adminRequired : true});
        // $state.go('home');
        $state.go('board.home', {main_menu: 'home'})
    }


})


// function w3_open() {
//     document.getElementById("main").style.marginLeft = "180px";
//     document.getElementById("mySidebar").style.width = "180px";
//     document.getElementById("mySidebar").style.display = "block";
//     document.getElementById("openNav").style.display = 'none';
// }
// function w3_close() {
//     document.getElementById("main").style.marginLeft = "0";
//     document.getElementById("mySidebar").style.display = "none";
//     if (document.getElementById("openNav")) {
//         document.getElementById("openNav").style.display = "inline-block";
//     }
// }


// function myAccFunc() {
//     var x = document.getElementById("demoAcc");
//     if (x.className.indexOf("w3-show") == -1) {
//         x.className += " w3-show";
//         x.previousElementSibling.className += " w3-green";
//     } else {
//         x.className = x.className.replace(" w3-show", "");
//         x.previousElementSibling.className =
//             x.previousElementSibling.className.replace(" w3-green", "");
//     }
// }

// function myDropFunc() {
//     var x = document.getElementById("demoDrop");
//     if (x.className.indexOf("w3-show") == -1) {
//         x.className += " w3-show";
//         x.previousElementSibling.className += " w3-green";
//     } else {
//         x.className = x.className.replace(" w3-show", "");
//         x.previousElementSibling.className =
//             x.previousElementSibling.className.replace(" w3-green", "");
//     }
// }


app.controller('main.ctrl', function ($location, $window, $state, $scope, userService, boardService, appContextService, toastr, config) {
    
    console.log('MAIN')
    $scope._ = _;
    var vm = this;
    vm.appContext = appContextService.context;
    // vm.version = Date.now();
    vm.site = config.site;

    vm.langs = [];

    _.each(config.langs, function(item){
        vm.langs.push(item.lang)
    })
    
    vm.lang = $window.localStorage.getItem('lang');
    if (!vm.lang) {
        vm.lang = (window.navigator.userLanguage || window.navigator.language).substring(0, 2);
    }
    vm.lang = vm.langs[_.findIndex(vm.langs, { code: vm.lang })];

    vm.langChange = function() {
        console.log('langChange vm.lang', vm.lang.code, $window.localStorage.getItem('lang'));
        vm.appContext.lang = vm.lang.code;
        vm.appContext.menuArray = angular.copy(config.langs[vm.lang.code].menu);
        vm.config = angular.copy(config.langs[vm.lang.code].layout);
        if (vm.lang.code !== $window.localStorage.getItem('lang') ) {
            $window.localStorage.setItem('lang', vm.lang.code);
            $state.go('board.home', {'main_menu': 'home'});
        }

        console.log('main... ', config.langs[$window.localStorage.getItem('lang')].layout.relatedLink);
        boardService.list(config.langs[$window.localStorage.getItem('lang')].layout.relatedLink, 1, 100, -1, '').then(
            function (results) {
                vm.appContext.relatedLinks = results.data.list;
            },
            function (err) {
                console.log(err);
            }
        );

    }
    vm.langChange();

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        vm.appContext.isDebug = true;
        vm.appContext.isLocalhost = true;
    }
    var checkMobile = function () {
        if (Number(window.innerWidth) <= 600) {
            vm.appContext.isMobile = true;
        } else {
            vm.appContext.isMobile = false;
        }
        // w3_close();
    };
    checkMobile();

    window.addEventListener("resize", function () {
        $scope.$apply(function () {
            checkMobile();
        })
    });

    vm.selectedMenu = null;

    vm.menuClick = function(item){
        // console.log('click', menu);
        // vm.showDropdown = false;
        // vm.selectedMenu = menu;

        // vm.appContext.selectedMenu = menu;

        vm.menu = item;
    }

    if (!vm.appContext.user || vm.appContext.user.role != 'admin') {
        _.remove(vm.appContext.menuArray.list, {
            adminRequired: true
        });
    }

    userService.list().then(function (res) {
        vm.appContext.users = res.data;
    });


    vm.relatedLinkClick = function (event) {
        vm.showRelatedLinkDropdown = !vm.showRelatedLinkDropdown;
        event.stopPropagation();
    }
    vm.bodyClick = function () {
        console.log('bodyClick')
        vm.showRelatedLinkDropdown = false;
        vm.showMobileMenu = false;

    }

})

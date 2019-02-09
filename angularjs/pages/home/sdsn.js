/**
 * Created by mac on 18/02/2017.
 */
app.controller('sdsn.ctrl', function ($scope, boardService, appContextService, config) {

    var vm = this;
    vm.appContext = appContextService.context;
    vm.config = config.site;

    // 연구발간물

    // 공지사항

    // 행사자료집

    // 성명서

    vm.contenstList = [{
        header: '연구발간물',
        main_menu: 'resources',
        sub_menu: 'issue',
        sort: -1,
    }, {
        header: '공지사항',
        main_menu: 'news',
            sub_menu: 'notice',
        sort: -1,
    }, {
        header: '행사자료집',
            main_menu: 'resources',
        sub_menu: 'event-docs',
        sort: -1,
    }, {
        header: '성명서',
        main_menu: 'resources',
        sub_menu: 'public',
        sort: -1,
    }, ];



    vm.getContents = function () {
        vm.contenstList.forEach(function(element, index) {
            // console.log('aaa', index, element)
            boardService.list(element.sub_menu, 1, 4, element.sort, '').then(
                function (res) {
                    // console.log('element.title', element.title);
                    // console.log('res.data', res.data)
                    // vm.notice = res.data.list[0];
                    // console.log('index', index);
                    if (res.data.list.length) {
                        element._id = res.data.list[0]._id;
                        element.title = res.data.list[0].title;
                        element.list = res.data.list;
                        // console.log('res', element)
                    }
                    if (index === vm.contenstList.length - 1) {
                        // console.log('vm.contenstList', vm.contenstList)
                        vm.contents = _.chunk(vm.contenstList, 2);
                        // console.log('vm.contents', vm.contents)
                    }

                },
                function (err) {
                    console.log(err);
                }
            );
        });
    }
    vm.getContents();


    // MLRN?,  Nexus, Thematic Groups, Contact
    vm.menus = [{
        title: 'MLRN?',
        isPage: true,
        main_menu: 'about',
        sub_menu: 'mlrn'
    },
    {
        title: 'MEETING OUTCOMES',
        isPage: false,
        main_menu: 'focus',
        sub_menu: 'meeting_outcomes'
    },
    {
        title: 'Nexus',
        isPage: true,
        main_menu: 'focus',
        sub_menu: 'nexus'
    },
    // {
    //     title: 'Thematic Groups',
    //     main_menu: 'focus',
    //     sub_menu: 'thematic_groups'
    // },
    {
        title: 'Contact',
        isPage: true,
        main_menu: 'about',
        sub_menu: 'contact'
    },
    ];

    // vm.getContents = function () {
    //     boardService.list('notice', 1, 4, -1, '').then(
    //         function (res) {
    //             console.log('res', res);
    //             vm.notices = res.data.list;

    //         },
    //         function (err) {
    //             console.log(err);
    //         }
    //     );

    //     boardService.list('issue', 1, 4, -1, '').then(
    //         function (res) {
    //             console.log('res', res);
    //             vm.issues = res.data.list;

    //         },
    //         function (err) {
    //             console.log(err);
    //         }
    //     );
    //     boardService.list('event-docs', 1, 4, -1, '').then(
    //         function (res) {
    //             console.log('res', res);
    //             vm.eventdocs = res.data.list;

    //         },
    //         function (err) {
    //             console.log(err);
    //         }
    //     );
    //     boardService.list('public', 1, 4, -1, '').then(
    //         function (res) {
    //             // console.log('res', res);
    //             vm.publics = res.data.list;

    //         },
    //         function (err) {
    //             console.log(err);
    //         }
    //     );
    // }
    // vm.getContents();



    vm.getBanners = function (page) {
        vm.currentPage = page;
        boardService.list('korea-sdsn', 1, 5, -1, '').then(
            function (results) {
                vm.slides = results.data.list;
                if (vm.slides.length) {}
            },
            function (err) {
                console.log(err);
            }
        );
        boardService.list('link_banner', 1, 100, -1, '').then(
            function (results) {
                vm.links = results.data.list;
            },
            function (err) {
                console.log(err);
            }
        );

    }
    vm.getBanners(vm.currentPage);

    return;


    // var responsive = this;
    vm.ngIncludeTemplates = [{
        index: 0,
        name: 'first',
        url: 'firstSwipe.html'
    }, {
        index: 1,
        name: 'second',
        url: 'secondSwipe.html'
    }, {
        index: 2,
        name: 'third',
        url: 'thirdSwipe.html'
    }, {
        index: 3,
        name: 'fourth',
        url: 'fourthSwipe.html'
    }];
    vm.selectPage = selectPage;

    /**
     * Initialize with the first page opened
     */
    vm.ngIncludeSelected = vm.ngIncludeTemplates[0];

    /**
     * @name selectPage
     * @desc The function that includes the page of the indexSelected
     * @param indexSelected the index of the page to be included
     */
    function selectPage(indexSelected) {
        if (vm.ngIncludeTemplates[indexSelected].index > vm.ngIncludeSelected.index) {
            vm.moveToLeft = false;
        } else {
            vm.moveToLeft = true;
        }
        vm.ngIncludeSelected = vm.ngIncludeTemplates[indexSelected];
    }












})
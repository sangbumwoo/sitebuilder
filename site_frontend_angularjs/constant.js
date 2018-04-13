app.constant('config', {

    langs: {
        ko: {
            lang: {
                code: 'ko',
                local: '한국어',
                name: 'Korean',
            },
            layout: {
                appTitle: '', //Header Title
                headerLogoUrl: '/images/sdsn_korea_logo.png',
                footerLogoUrl: '/images/sdsn_korea_logo_reverse.png',
                email: 'sdsn_korea@korea.ac.kr',
                address1: '서울특별시 성북구 안암로 145 (안암동5가 1-2),',
                address2: '고려대학교 서울캠퍼스 R&D센터 오정에코리질리언스연구원',
                mainBanner: 'korea-sdsn',
                linkBanner: 'link_banner',
                relatedLink: 'related_links',
                sections: [{
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
                }]
            },
            menu: {
                list: [{
                        name: 'korea_sdsn',
                        title: '한국SDSN',
                        activeIndex: 0,
                        list: [{
                                name: 'korea_sdsn_chairman',
                                title: '인사말',
                            },
                            {
                                name: '',
                                title: '메시지',
                                list: [
                                    // {
                                    //     name: 'korea_sdsn_honor_chairman',
                                    //     title: '한국SDSN 명예회장'
                                    // },
                                    // {
                                    //     name: 'korea_sdsn_head_consultant',
                                    //     title: '한국SDSN 고문단 의장'
                                    // },
                                    {
                                        name: 'korea_sdsn_representative',
                                        title: '한국SDSN 대표'
                                    },
                                ]
                            },
                            {
                                name: 'sdsn_history',
                                title: '한국SDSN소개',
                                listStyle: 'page',
                            },
                            {
                                name: 'organization',
                                title: '조직도'
                            },
                            {
                                name: 'map',
                                title: '오시는 길',
                                // contactFormRequired: true,
                            },

                        ]
                    },

                    {
                        name: 'network',
                        title: '네트워크',
                        activeIndex: 0,
                        list: [{
                                name: 'member',
                                title: '회원',
                                listStyle: 'page',
                                mode: 'page',

                                isPage: true,
                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: 'partner',
                                title: '협력기관',
                                listStyle: 'page',
                                mode: 'page',

                                isPage: true,
                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,

                            },

                        ]
                    },
                    {
                        name: 'issue_platform',
                        title: '중점분야',
                        activeIndex: 0,
                        list: [{
                                name: 'issue_01',
                                title: '지속가능발전목표',
                                listStyle: 'page',
                                mode: 'page',
                                isPage: true,

                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: 'issue_02',
                                title: '유엔SDSN',
                                listStyle: 'page',
                                mode: 'page',
                                isPage: true,

                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: 'issue_03',
                                title: '한국SDSN',
                                list: [{
                                        name: 'issue_031',
                                        title: '분과소개',
                                        mode: 'page',
                                        isPage: true,
                                    },
                                    {
                                        name: 'issue_032',
                                        title: '지표개발',
                                        mode: 'page',
                                        isPage: true,
                                    },
                                    {
                                        name: 'issue_033',
                                        title: '중위도',
                                        mode: 'page',
                                        isPage: true,
                                    },
                                ]
                            },

                        ]
                    },
                    {
                        name: 'news',
                        title: '뉴스&이벤트',
                        activeIndex: 0,
                        list: [{
                                name: 'notice',
                                title: '공지사항',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                showImage: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'korea-sdsn',
                                title: '한국SDSN소식',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                showImage: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'un-sdsn',
                                title: '유엔SDSN소식',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                        ]
                    },


                    {
                        name: 'resources',
                        title: '자료실',
                        activeIndex: 0,
                        list: [{
                                name: 'issue',
                                title: '연구 발간물',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                htmlEdit: true,
                                showImage: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'event-docs',
                                title: '행사자료집',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                htmlEdit: true,
                                showImage: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'public',
                                title: '성명서',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                showImage: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                        ]
                    },

                    {
                        name: 'SETTINGS',
                        title: '설정',
                        activeIndex: 0,
                        adminRequired: true,
                        list: [{
                                name: 'link_banner',
                                title: 'LINK BANNER',
                                listStyle: 'list',
                                mode: 'board',
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: false,
                                urlRequired: true,
                                htmlEdit: false,
                                imageRequired: true,
                                fileRequired: false,
                            },
                            {
                                name: 'related_links',
                                title: 'RELATED LINKS',
                                listStyle: 'list',
                                mode: 'board',
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: false,
                                urlRequired: true,
                                htmlEdit: false,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: 'function_test',
                                title: '기능테스트',
                            },
                        ]
                    },
                    {
                        name: 'home',
                        title: '홈',
                        isHome: true,
                        activeIndex: 0,
                        // list: [
                        //     {
                        //         name: 'home',
                        //         title: '홈',
                        //         isHome: true,
                        //     },
                        // ]
                    },


                ]
            }

        },
        en: {
            lang: {
                code: 'en',
                local: 'English',
                name: 'English'
            },
            layout: {
                appTitle: '', //Header Title
                headerLogoUrl: '/images/sdsn_korea_logo.png',
                footerLogoUrl: '/images/sdsn_korea_logo_reverse.png',
                email: 'sdsn_korea@korea.ac.kr',
                address1: '#614, KU R&D Center, OJeong Eco-Resilience Institute,',
                address2: 'Korea University 145 Anam-ro, Seongbuk-gu,Seoul, 02841, Korea',
                mainBanner: 'korea-sdsn__en',
                linkBanner: 'link_banner__en',
                relatedLink: 'related_links__en',
                sections: [{
                    header: 'RESEARCH DOCS',
                    main_menu: 'resources',
                    sub_menu: 'issue__en',
                    sort: -1,
                }, {
                    header: 'NOTICE',
                    main_menu: 'news',
                    sub_menu: 'notice__en',
                    sort: -1,
                }, {
                    header: 'EVENT DOCS',
                    main_menu: 'resources',
                    sub_menu: 'event-docs__en',
                    sort: -1,
                }, {
                    header: 'PUBLICIS',
                    main_menu: 'resources',
                    sub_menu: 'public__en',
                    sort: -1,
                }]            },
            menu: {
                list: [{
                        name: 'korea_sdsn',
                        title: 'KOREA SDSN',
                        activeIndex: 0,
                        list: [{
                                name: 'korea_sdsn_chairman__en',
                                title: 'Greeting',
                            },
                            {
                                name: '',
                                title: 'Message',
                                list: [
                                    // {
                                    //     name: 'korea_sdsn_honor_chairman__en',
                                    //     title: 'Korea SDSN honor chairman'
                                    // },
                                    // {
                                    //     name: 'korea_sdsn_head_consultant__en',
                                    //     title: 'Korea SDSN chief sponsor'
                                    // },
                                    {
                                        name: 'korea_sdsn_representative__en',
                                        title: 'Korea SDSN representative'
                                    },
                                ]
                            },
                            {
                                name: 'sdsn_history__en',
                                title: 'Introduction',
                                listStyle: 'page',
                            },
                            {
                                name: 'organization__en',
                                title: 'Organizaion'
                            },
                            {
                                name: 'map__en',
                                title: 'Map',
                                // contactFormRequired: true,
                            }

                        ]
                    },

                    {
                        name: 'network__en',
                        title: 'NETWORK',
                        activeIndex: 0,
                        list: [{
                                name: 'member__en',
                                title: 'MEMBER',
                                listStyle: 'page',
                                mode: 'page',

                                isPage: true,
                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: 'partner__en',
                                title: 'PARTNER',
                                listStyle: 'page',
                                mode: 'page',

                                isPage: true,
                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,

                            },

                        ]
                    },
                    {
                        name: 'issue_platform__en',
                        title: 'FOCUS',
                        activeIndex: 0,
                        list: [{
                                name: 'issue_01__en',
                                title: 'SDG',
                                listStyle: 'page',
                                mode: 'page',
                                isPage: true,

                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: 'issue_02__en',
                                title: 'UN_SDSN',
                                listStyle: 'page',
                                mode: 'page',
                                isPage: true,

                                showTitle: false,
                                titleRequired: false,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: '',
                                title: 'Korea SDSN',
                                list: [{
                                        name: 'issue_031__en',
                                        title: 'Intro',
                                        mode: 'page',
                                        isPage: true,
                                    },
                                    {
                                        name: 'issue_032__en',
                                        title: 'Index Dev',
                                        mode: 'page',
                                        isPage: true,
                                    },
                                    {
                                        name: 'issue_033__en',
                                        title: 'MRLN',
                                        mode: 'page',
                                        isPage: true,
                                    },
                                ]
                            },

                        ]
                    },
                    {
                        name: 'news__en',
                        title: 'NEWS&EVENT',
                        activeIndex: 0,
                        list: [{
                                name: 'notice__en',
                                title: 'NOTICE',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                showImage: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'korea-sdsn__en',
                                title: 'Korea SDSN News',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                showImage: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'un-sdsn__en',
                                title: 'UN SDSN News',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                        ]
                    },


                    {
                        name: 'resources__en',
                        title: 'DOCUMENTS',
                        activeIndex: 0,
                        list: [{
                                name: 'issue__en',
                                title: 'Research',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                htmlEdit: true,
                                showImage: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'event-docs__en',
                                title: 'Event',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                htmlEdit: true,
                                showImage: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                            {
                                name: 'public__en',
                                title: 'Publication',
                                listStyle: 'list',
                                mode: 'board',
                                showHeader: true,
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: true,
                                showImage: true,
                                htmlEdit: true,
                                imageRequired: false,
                                // fileRequired: true,
                                thumbnailRequired: true,
                            },
                        ]
                    },

                    {
                        name: 'SETTINGS__en',
                        title: 'SETTINGS',
                        activeIndex: 0,
                        adminRequired: true,
                        list: [{
                                name: 'link_banner__en',
                                title: 'LINK BANNER',
                                listStyle: 'list',
                                mode: 'board',
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: false,
                                urlRequired: true,
                                htmlEdit: false,
                                imageRequired: true,
                                fileRequired: false,
                            },
                            {
                                name: 'related_links__en',
                                title: 'RELATED LINKS',
                                listStyle: 'list',
                                mode: 'board',
                                showContentInList: false,
                                titleRequired: true,
                                contentRequired: false,
                                urlRequired: true,
                                htmlEdit: false,
                                imageRequired: false,
                                fileRequired: false,
                            },
                            {
                                name: 'function_test__en',
                                title: 'Function Test',
                            },
                        ]
                    },
                    {
                        name: 'home',
                        title: 'HOME',
                        isHome: true,
                        activeIndex: 0,
                        // list: [
                        //     {
                        //         name: 'home',
                        //         title: '홈',
                        //         isHome: true,
                        //     },
                        // ]
                    },

                ]
            }

        },



    },
    site: {
        appName: 'My App',
        appVersion: 1.0,
        pageTitle: 'SDSN',
        appHome: 'sdsn',
        userId: 'sdsn_korea@korea.ac.kr',
        backgroundClass: 'w3-sdsnblue',
        hoverBackgroundClass: 'w3-hover-sdsnblue',
        hideFooterLine: true,
        apiUrl: 'http://ec2-13-125-94-7.ap-northeast-2.compute.amazonaws.com',
        // apiUrl: 'http://127.0.0.1:1337',
        // apiUrl: 'http://www.sdsnkora.org',
    },

});
// var getStuff = function () {
//     var outside = angular.element(document.getElementById('stuff')).scope();
//     console.log('getStuff', outside) // retrieved "outside" of AngularJS
// }



app.controller('board.save.ctrl', function ($scope, $rootScope, $window, $http, $stateParams, boardService, toastr, config, appContextService) {


    var vm = this;
    vm.appContext = appContextService.context;
    vm.config = config;


              $scope.options = {
    height: 100,
    focus: true,
    // airMode: true,
    // disable: true,
    // contenteditable: false,
    editable: false,
    toolbar: [
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    // ['font', ['strikethrough', 'superscript', 'subscript']],
    // ['fontsize', ['fontsize']],
    // ['color', ['color']],
    // ['para', ['ul', 'ol', 'paragraph']],
    // ['height', ['height']],

    ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['fontsize', ['fontsize']],
            // ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link','picture','video','hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
  };

// console.log('contacts', _.range(1,3))




// var data = []
var data = {
    list : [{
            name: 'korea_sdsn',
            title: '한국SDSN',
            activeIndex: 0,
            list: [{
                    name: 'un_sdsn',
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
                    name: '',
                    title: '인사말',
                    list: [{
                        name: 'korea_sdsn_chairman',
                        title: '한국SDSN 회장'
                    }, ]
                },
                {
                    name: '',
                    title: '메시지',
                    list: [{
                            name: 'korea_sdsn_honor_chairman',
                            title: '한국SDSN 명예회장'
                        },
                        {
                            name: 'korea_sdsn_head_consultant',
                            title: '한국SDSN 고문단 의장'
                        },
                        {
                            name: 'korea_sdsn_representative',
                            title: '한국SDSN 대표'
                        },
                    ]
                },
                {
                    name: 'sdsn_history',
                    title: '설립배경'
                },
                {
                    name: 'organization',
                    title: '조직도'
                },
                {
                    name: 'map',
                    title: '오시는 길'
                },

            ]
        },

        {
            name: 'resources',
            title: 'RESOURCES',
            activeIndex: 0,
            list: [{
                    name: 'reports_papers',
                    title: 'REPORTS & PAPERS',
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
                {
                    name: 'events',
                    title: 'EVENTS',
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
            name: 'news',
            title: 'NEWS',
            activeIndex: 1,
            list: [{
                    name: 'notice',
                    title: 'NOTICE',
                    listStyle: 'table',
                    mode: 'board',
                    showHeader: true,
                    showContentInList: false,
                    titleRequired: true,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'activities',
                    title: 'ACTIVITIES',
                    listStyle: 'list',
                    mode: 'board',
                    showHeader: true,
                    showContentInList: true,
                    titleRequired: true,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
            ]
        },

    ]
}


    vm.goBack = function () {
        window.history.back();
    }

    vm.deleteImage = function (index) {
        vm.data.images.splice(index, 1)
    }

    $scope.imageChanged = function (element) {

        vm.isUploading = true;
        var file = element.files[0];
        var fd = new FormData();
        fd.append('file', file);
        $http.post(vm.config.site.apiUrl + '/api/files/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            vm.isUploading = false;
            // vm.data.images.push({ url: "/files/" + res.data });
            // vm.data.images = [];
            vm.data.images.push(res.data);
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });


    };

    vm.deleteFile = function (index, list) {
        // vm.data.files.splice(index, 1)
        list.splice(index, 1)
    }

    $scope.fileChanged = function (element) {
        vm.isUploading = true;
        var file = element.files[0];
        var fd = new FormData();
        fd.append('file', file);
        $http.post(vm.config.site.apiUrl + '/api/files/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            vm.data.files.push(res.data);
            vm.isUploading = false;
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });
    };

    //thumbnailChanged
    $scope.thumbnailChanged = function (element, item) {
        vm.isUploading = true;
        var file = element.files[0];
        var fd = new FormData();
        fd.append('file', file);
        $http.post(vm.config.site.apiUrl + '/api/files/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            // vm.data.files.push(res.data);
            
            console.log('item ..... ', item)
            console.log('vm.selectedItem ..... ', vm.selectedItem)
            console.log('res.data ..... ', res.data)
            vm.selectedItem.thumbnail = res.data.filename;
            console.log('vm.data.files ~~~~~~~~~',vm.data.files);
            vm.isUploading = false;
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });
    };

    vm.deleteThumbnail = function(file) {
        console.log('vm.deleteThumbnail 1', file);
        delete file.thumbnail; 
        console.log('vm.deleteThumbnail 2', file);
    }

    vm.save = function () {

        if ($stateParams.articleId) {
            // 서버에서 req.body를 저장하기 위해서, _id를 삭제하고 전송한다.
            delete vm.data._id;
            boardService.update($stateParams.articleId, vm.data).then(
                function () {
                    window.history.back();
                },
                function (err) {
                    alert(JSON.stringify(err));
                    window.history.back();
                }
            )
        } else {
            boardService.post(vm.data).then(
                function () {
                    window.history.back();
                },
                function (err) {
                    alert(err);
                    window.history.back();
                }
            )
        }
    }

    var load = function() {
        if ($stateParams.articleId) {
            boardService.get($stateParams.articleId).then(
                function (result) {
                    // console.log(result);
                    vm.data = result.data;
                }, function (err) {
                    alert(err);
                }
            )
        } else {
            // vm.data = {};

            vm.data = {
                articleType: $stateParams.sub_menu,
                title: '',
                url: '',
                content: '',
                date: new Date(),
                images: [],
                files: []
            }

            if (vm.appContext.isLocalhost) {
                vm.data.title = vm.appContext.selectedMenu.title + ' - TEST';
                vm.data.url = 'http://ojeri.korea.ac.kr/ko/';
            }
        }
    }

    load();


    vm.copyToClipboard = function (text_to_share) {
        console.log('text_to_share', text_to_share)
        // var text_to_share = "hello world";

        // create temp element
        var copyElement = document.createElement("span");
        copyElement.appendChild(document.createTextNode(text_to_share));
        copyElement.id = 'tempCopyToClipboard';
        angular.element(document.body.append(copyElement));

        // select the text
        var range = document.createRange();
        range.selectNode(copyElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // copy & cleanup
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        copyElement.remove();

        toastr.success('Link URL has been copyed to clipboard.');
    }

    // vm.tinymceOptions = {
    //     visual: true,
    //     plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
    //     toolbar: 'undo redo | code | table image link hr | formatselect | fontselect | fontsizeselect | blockquote bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    //     image_advtab: true,
    //     image_title: true, 
    //     automatic_uploads: true,
    //     file_picker_types: 'image', 
    //     file_picker_callback: function(cb, value, meta) {
    //         var input = document.createElement('input');
    //         input.setAttribute('type', 'file');
    //         input.setAttribute('accept', 'image/*');
    
    //         // Note: In modern browsers input[type="file"] is functional without 
    //         // even adding it to the DOM, but that might not be the case in some older
    //         // or quirky browsers like IE, so you might want to add it to the DOM
    //         // just in case, and visually hide it. And do not forget do remove it
    //         // once you do not need it anymore.

    //         input.onchange = function() {
    //             console.log('input.onchange !!!!!!!!')
    //         var file = this.files[0];
            
    //         var reader = new FileReader();
    //         reader.onload = function () {
    //             // Note: Now we need to register the blob in TinyMCEs image blob
    //             // registry. In the next release this part hopefully won't be
    //             // necessary, as we are looking to handle it internally.
    //             var id = 'blobid' + (new Date()).getTime();
    //             var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
    //             var base64 = reader.result.split(',')[1];
    //             var blobInfo = blobCache.create(id, file, base64);
    //             blobCache.add(blobInfo);

    //             // call the callback and populate the Title field with the file name
    //             cb(blobInfo.blobUri(), { title: file.name });
    //         };
    //         reader.readAsDataURL(file);
    //         };
            
    //         input.click();
    //     },

    //     height:300,
    //     inline: false,
    //     // skin: 'lightgray',
    //     // theme : 'modern',
    //     content_css: [
    //         // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    //         // '//www.tinymce.com/css/codepen.min.css',
    //         'css/tinymce.css',
    //     ]
    // };


    vm.tinymceOptions = {
        visual: true,
        plugins: 'code print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
        toolbar: 'undo redo | code | table image link hr | formatselect | fontselect | fontsizeselect | blockquote bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        image_advtab: true,
        image_title: true,
        height: 300,
        inline: false,
        fontsize_formats: "8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 24px 36px",
        content_css: [
            'css/tinymce.css',
        ],
        images_upload_handler: function (blobInfo, success, failure) {
            var fd = new FormData();
            // fd.append('file', blobInfo.blob(), fileName(blobInfo));
            fd.append('file', blobInfo.blob());
            $http.post(config.apiUrl + '/api/files/', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (res) {
                let url = config.site.apiUrl + '/files/' + res.data.filename
                console.log('url', url)
                success(url);
            }, function (err) {
                console.log("error", err)
                // vm.isUploading = false;
                failure('File upload error');
            });
        },
    };

})


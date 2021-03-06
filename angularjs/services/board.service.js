app.factory('boardService', function ($http, config) {

    var factory = {};

    factory.notices = []

    factory.list = function (articleType, page, pageSize, sort, searchText) {
        // console.log("articleType :::: " + articleType)
        return $http.get(config.site.apiUrl + '/board?page=' + page + '&rows=' + pageSize + '&sort=' + sort + '&articleType=' + articleType + '&searchText=' + searchText);
    }

    factory.getPage = function (articleType) {
        return $http.get(config.site.apiUrl + '/board/page/' + articleType);
    }



    factory.get = function (sid) {
        return $http.get(config.site.apiUrl + '/board/' + sid);
    }


    factory.post = function (item) {
        return $http.post(config.site.apiUrl + '/board', item);
    }

    factory.update = function (sid, item) {
        return $http.put(config.site.apiUrl + '/board/' + sid, item);
    }


    factory.delete = function (sid) {
        return $http.delete(config.site.apiUrl + '/board/' + sid);
    }

    factory.sendMail = function (item) {
        return $http.post(config.site.apiUrl + '/board/sendmail', item);
    }



    return factory;

});

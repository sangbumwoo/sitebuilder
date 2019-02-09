app.factory('headerService', function ($http, config) {

    var factory = {};

    factory.get = function (articleType) {
        return $http.get(config.site.apiUrl + '/header/' + articleType);
    }

    factory.save = function (data) {
        return $http.put(config.site.apiUrl + '/header', data);
    }

    factory.delete = function (sid) {
        return $http.delete(config.site.apiUrl + '/header/' + sid);
    }


    return factory;

});

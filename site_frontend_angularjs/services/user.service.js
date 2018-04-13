app.factory('userService', function($http, config){

  var factory = {};

  factory.signup = function(user) {
    console.log(user);
    return $http.post(config.site.apiUrl + '/user/signup', user);
  }

  factory.login = function(user) {
    return $http.post(config.site.apiUrl + '/user/login', user);
  }

  factory.list = function() {
    return $http.get(config.site.apiUrl + '/user/list');
  }




  return factory;

});

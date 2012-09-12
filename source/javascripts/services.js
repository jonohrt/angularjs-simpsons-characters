'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['characterServices', 'characterDetailServices']).
  value('version', '0.1');

angular.module('characterServices', ['ngResource']).
    factory('Character', function($resource){
  return $resource('http://simpsons.wikia.com/api.php', {alt: 'json', callback: 'JSON_CALLBACK'}, {
    query: {method:'JSONP', params:{action:'query', list:'categorymembers',cmtitle:'Category:Characters',format:'json',cmlimit:'20', cmcontinue:''  }, isArray:false}
  });
});

angular.module('characterDetailServices', ['ngResource']).
    factory('CharacterDetail', function($resource){
  		return $resource('http://simpsons.wikia.com/api.php', {alt: 'json', callback: 'JSON_CALLBACK'}, {
    	get: {method:'JSONP', params:{action:'parse', page:'', prop:'text', format:'json'}, isArray:false}
  });
});


//curl -X --url http://simpsons.wikia.com/api.php\?action\=query\&list\=categorymembers\&cmtitle\=Category:Characters\&format\=xml\&cmlimit\=500
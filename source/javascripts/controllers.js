'use strict';

/* Controllers */


function Main($scope, Character) {
	$scope.items = [];
	$scope.loading = false;
    Character.query({},function(response){
		$scope.queryContinue = response['query-continue'].categorymembers.cmcontinue;
		var items = response.query.categorymembers;
		angular.forEach(items, function(value, key){
			if(value.pageid == "16832" || value.pageid == "8462") {
				var index = items.indexOf(value);
				items.splice(index,index  + 1);
			}
		});
		$scope.items = items;
	});
		
    var counter = 0;
    $scope.loadMore = function() {
    	if(!$scope.loading) {
    		$scope.loading = true;
    		Character.query({cmcontinue: $scope.queryContinue},function(response){
						$scope.queryContinue = response['query-continue'].categorymembers.cmcontinue;
						$(response.query.categorymembers).each(function(index, item) {
							$scope.items.push(item);
						})
						$scope.loading = false;
					});
    		}
       };

     
     
};

function CharacterThumbCtrl($scope, $element, $attrs, CharacterDetail) {

	var character = {};
	

	$attrs.$observe('title', function(value) {

	 	    CharacterDetail.get({page: value}, function(response) {
	 	   
	  			character = $scope.parseHTML(response.parse.text);

				$scope.thumb = character.thumb;
				$scope.article = character.article;
				$scope.title = value;
				$scope.pageid = $attrs.pageid;

	  	});
	 	

   });
   

	$scope.parseHTML = function (data) {						
			var parsedData = $(data["*"]);

			var charcter = {};
			character.thumb =  $(parsedData.siblings('.infobox').find('tr')[1]).find('img').attr('src');
			if (parsedData.siblings('.infobox').length === 0) {
				try {
					character.thumb = $(data.parse.text["*"]).find('.thumbimage').attr('src');
				} catch(err) {
					character.thumb = "/images/no-image.png";
				}
			}

			if (character.thumb === undefined) {
				character.thumb = "/images/no-image.png";
			}
			character.article = $(parsedData.siblings('p')[0]).html();
			return character;
	};
};



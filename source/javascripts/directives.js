'use strict';

/* Directives */


angular.module('myApp.directives', []).
	directive('whenScrolled', function() {
		    return function(scope, elm, attr) {
		        var raw = elm[0];
		        $(window).bind('scroll', function() {
		           if($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
		                scope.$apply(attr.whenScrolled);
		            }
		        });
				}
			}).
	directive('characterDetail', function(CharacterDetail) {
			return {
			
					restrict: 'E', 
					scope: {title: '@',
							pageid: '@'},
					controller: CharacterThumbCtrl
    				

    				}
					
			

			});
		    


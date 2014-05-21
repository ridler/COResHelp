(function() {

	var app = angular.module('coloradoResidency', []);

	var termStart, relAge, adult;

	var termDate = function(term, year) {
		switch(term) {
			case 'Fall': {
				switch(year) {
					case 2014: return new Date('8/26/2014'); break;
					case 2015: return new Date('8/23/2015'); break;
					case 2016: return new Date('8/24/2016'); break;
				}
			}
			case 'Spring': {
				switch(year) {
					case 2014: return new Date('1/15/2014'); break;
					case 2015: return new Date('1/16/2015'); break;
					case 2016: return new Date('1/13/2016'); break;
				}
			}
			case 'Summer': {
				switch(year) {	
					case 2014: return new Date('5/17/2014'); break;
					case 2015: return new Date('5/19/2015'); break;
					case 2016: return new Date('5/24/2016'); break;
				}
			}
		}
	};

	app.controller('FormController', [ '$scope', function($scope) {
		$scope.terms = ['Fall', 'Spring', 'Summer'];
		$scope.years = [2014, 2015, 2016];
	}]);

	app.filter('age', function() {
		return function(input) { return moment().diff(moment(input), 'years'); };
	});

	app.filter('termStart', function() {
		return function(input) {
			var a = input.split(' ');
			return termStart = termDate(a[0], parseInt(a[1]));
		};
	});

	app.filter('relAge', function() {
		return function(input) {
			relAge = moment(termStart).diff(moment(input), 'years');
			if(relAge < 22) { adult = false; }
			return relAge;
		};
	});

	// app.directive('inputBday', function() {
	// 	return {
	// 		restrict: 'E',
	// 		template: '<input type="date" class="form-control" placeholder="mm/dd/yyyy" title="birthday"/>\n<span ng-show="form.bday">Your birthday is {{form.bday | date}}</span>',
	// 		replace: false,
	// 		controller: 'FormController',
	// 		require: ['^form', 'ngModel'],
	// 		scope: {},
	// 		link: function(scope, element, attrs, ctrl) {
	// 			scope = ctrl[0];
	// 			console.log(scope);
	// 		}
	// 	};
	// });
	// app.controller('AnnouncementsController', [ '$scope', '$http', function($scope, $http) {
	// 	$http.get('/announcements.json').success(function(data) {
	// 		for(var a = 0; a < data.length; a++) { 
	// 			if(data[a].type === 'meeting') { data[a].cssClass = "list-group-item-success"; }
	// 			else if(data[a].type === 'event') { data[a].cssClass = "list-group-item-warning"; }
	// 			else{ data[a].cssClass = "list-group-item-info"; }
	// 		}
	// 		$scope.announcements = data;
	// 	});
	// } ]);

})();
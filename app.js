(function() {

	var app = angular.module('coloradoResidency', []);

	var termStart, relAge, adult, deriv, grad, married;
	var incompleteAlert = '<div class="alert alert-danger"><p>All fields are required</p></div>';

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
		$scope.setAdult = function() {
			if(relAge < 23) { adult = false; } else { adult = true; }
			$scope.adult = adult;
			console.log('adult: ' + $scope.adult);
		}
		$scope.setDeriv = function(ans) {
			return ans ? deriv = true : deriv = false;
		};
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
			return relAge;
		};
	});

	$(document).ready(function() {

		$('#landing').click(function() {
			$(this).hide();
			$('.startpage').hide();
			$('#mainform').fadeIn('slow');
		});
		
		$('#maincnt').click(function() {
			if(relAge) {
				$('#mainform').hide();
				if(adult === false) { $('#nonadultform').fadeIn('slow'); }
				else if(adult === true) { $('#adultres').fadeIn('slow'); }
			} else {
				$(this).slideDown('slow', function() {
					$(this).before(incompleteAlert);
				});
			}
		});
		
		$('.btn-default').click(function() {
			$(this).addClass('btn-selected');
		});
		
		$('.reload').click(function() { location.reload(); } );

		$('#grad').click(function() { grad = true; } );
		$('#undergrad').click(function() { grad = false; } );
		$('#married').click(function() { married = true; } );
		$('#unmarried').click(function() { married = false; } );

		$('#nonadultcnt').click(function() {
			if(deriv == null) { $(this).before(incompleteAlert); return; }
			else {
				$('#nonadultform').hide();
				if(married || grad) { adult = true; }
				else { adult = false; }
				if(deriv === true) { $('#derivres').fadeIn('slow'); }
				else if(adult === true) { $('#adultres').fadeIn('slow'); }
				else { $('#emancres').fadeIn('slow'); console.log(adult); }
			}
		});
	});

})();

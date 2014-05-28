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

		$('#landing').css('margin-top', '' + ($(window).height()/2 - $('#landing').height()/2) + 'px');

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
		
		$('.reload').click(function() { location.reload(); } );

		$('#grad').click(function() {
			$(this).addClass('btn-selected');
			$('#undergrad').removeClass('btn-selected');
			grad = true;
		});
		$('#undergrad').click(function() {
			$(this).addClass('btn-selected');
			$('#grad').removeClass('btn-selected');
			grad = false;
		});
		$('#married').click(function() {
			$(this).addClass('btn-selected');
			$('#unmarried').removeClass('btn-selected');
			married = true;
		});
		$('#unmarried').click(function() {
			$(this).addClass('btn-selected');
			$('#married').removeClass('btn-selected');
			married = false;
		});
		$('#deriv').click(function() {
			$(this).addClass('btn-selected');
			$('#nonderiv').removeClass('btn-selected');
			deriv = true;
		});
		$('#nonderiv').click(function() {
			$(this).addClass('btn-selected');
			$('#deriv').removeClass('btn-selected');
			deriv = false;
		});

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

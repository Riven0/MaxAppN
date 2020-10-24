// Inicio de la aplicación IONIC

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	//Estado vista Tutorial
	.state("tutorial",{
		url:"/tutorial",
		templateUrl:"templates/tutorial.html",
		controller:"tutorialCtrl"
	})

	// Url de la vista tutorial
	$urlRouterProvider.otherwise('/tutorial');

});
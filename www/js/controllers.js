var firebaseConfig = {
	apiKey: "AIzaSyCtzD_d6_Rc0SN9NSqXTDcYnjxqcUEYW5g",
	authDomain: "maxapp-df7ce.firebaseapp.com",
	databaseURL: "https://maxapp-df7ce.firebaseio.com",
	projectId: "maxapp-df7ce",
	storageBucket: "maxapp-df7ce.appspot.com",
	messagingSenderId: "883374548975",
	appId: "1:883374548975:web:4f11acaedd03d0e3efb81a",
	measurementId: "G-PN5E88EJ6Z"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	//base de datos
	var database = firebase.database();

angular.module('starter.controllers', [])

//Controlador Para registro de usuario
.controller("registroCtrl",function($scope){
	$scope.obtener = function(user){
	firebase.auth().createUserWithEmailAndPassword(user.email, user.contra).then(function a(y){
		swal("se creo correctamente YEAH")
			firebase.database().ref("/usuario").set()({
				correo: user.email
	})
	firebase.out().signout().then(function(){
		// sign-out successful
		}).catch(function(error){
		// An error.
		}); // hasta aqui
		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		});
	}
})

//Controlador vista inicio
.controller("loginCtrl",function($scope, $ionicPopover){
	//conectar app con facebook
	$window.fbAsyncInit = function() {
		FB.init({ 
		appId: '657057955159871',
		status: true, 
		cookie: true, 
		xfbml: true,
		version: 'v2.4'
	});
};

	//popover
	// .fromTemplate() method
	  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Iniciar</h1> </ion-header-bar> <ion-content class="centrado"> HOLA jsjs! </ion-content></ion-popover-view>';

	  $scope.popover = $ionicPopover.fromTemplate(template, {
	    scope: $scope
	  });

	  // .fromTemplateUrl() method
	  $ionicPopover.fromTemplateUrl('login.html', {
	    scope: $scope
	  }).then(function(popover) {
	    $scope.popover = popover;
	  });


	  $scope.openPopover = function($event) {
	    $scope.popover.show($event);
	  };
	  $scope.closePopover = function() {
	    $scope.popover.hide();
	  };
	  //Cleanup the popover when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.popover.remove();
	  });
	  // Execute action on hidden popover
	  $scope.$on('popover.hidden', function() {
	    // Execute action
	  });
	  // Execute action on remove popover
	  $scope.$on('popover.removed', function() {
	    // Execute action
	  });
	//});
})

//Controlador vista principal

.controller("tutorialCtrl",function($scope){

})

//Controlador vista products mostrar productos por categoria filtrados

.controller("productsCtrl",function($scope, $rootScope){

	$rootScope.carrito = [];
	$rootScope.favoritos = [];
	$rootScope.vista;
	//Permite agregar productos al carrito
	$scope.agregar = function(x,cantidad){
		x["cantidad"]=cantidad;
		$rootScope.carrito.push(x);
		$rootScope.vista = true;
		$rootScope.subtotal = $rootScope.carrito[0].precio * $rootScope.carrito[0].cantidad;
	}
	//Permite agregar productos al carrito
	$scope.addFavoritos = function(y){
		$rootScope.favoritos.push(y);
		swal("Felicitaciones!","Su producto ha sido agregado a favoritos","success")

	}

	//carousel
	$scope.options = {
  		loop: false,
	  	effect: 'fade',
	  	speed: 500,
	}

		$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
		  // data.slider is the instance of Swiper
		  $scope.slider = data.slider;
		});

		$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
		  console.log('Slide change is beginning');
		});

		$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
		  // note: the indexes are 0-based
		  $scope.activeIndex = data.slider.activeIndex;
		  $scope.previousIndex = data.slider.previousIndex;
		});
	})

//controlador vista de productos por categoria sin filtrar
.controller('DashCtrl', function($scope,$rootScope, $state) {
	$rootScope.listaProductos=[];
	$rootScope.lista = [];
	firebase.database().ref("/productos").on("value", function(p){
		$rootScope.listaProductos = p.val();

	p.forEach(function(datos){
		$rootScope.lista.push(datos.val());
	})

		console.log($rootScope.listaProductos);
	})

	//Diccionario categoria de productos
	$rootScope.Categorias = [
		{
			nombreCategoria : "TV y VIDEO",
			imagen : "img/tag1.png",
			descripcion:"Televisores, Audio y Reproductores."
		},
		{
			nombreCategoria : "CELULARES",
			imagen : "img/tag2.png",
		 	descripcion:"Tigo, Claro y Liberados."
		},
		{
			nombreCategoria : "LINEA BLANCA",
			imagen : "img/tag3.png",
			descripcion:"Refrigeracion, Estufas, Lavadoras."
		},
		{
			nombreCategoria : "VIDEOJUEGOS",
			imagen : "img/tag4.png",
			descripcion:"Playstation, Xbox One, Pc Gaming."
		},
		{
			nombreCategoria : "COMPUTACION",
			imagen : "img/tag5.png",
			descripcion:"Laptop, Desktop, Accesorios."
		},
		{
			nombreCategoria : "AUDIO",
			imagen : "img/tag6.png",
			descripcion:"Audifonos, Fiestas, Bocinas Personales."
		}
  
	]

	//mostrar productos filtrados por categoria
	$scope.viewProducts = function(ncategoria){
		$rootScope.nombreCategoria = ncategoria;
		$state.go("products")
	}

})

//nuevo controlador productos por categoria sin filtrar

.controller('carritoCtrl', function($scope, $rootScope) {

	if($rootScope.carrito == undefined){
		$rootScope.vista = false
	}
	
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
})

.controller("favoritosCtrl", function($scope,$rootScope,$state){

})
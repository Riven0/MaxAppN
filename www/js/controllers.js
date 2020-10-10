var firebaseConfig = {
    apiKey: "AIzaSyBdTRZxYr0jpoy8KuMEbl_yMwve7E1S21c",
    authDomain: "maxapp-85793.firebaseapp.com",
    databaseURL: "https://maxapp-85793.firebaseio.com",
    projectId: "maxapp-85793",
    storageBucket: "maxapp-85793.appspot.com",
    messagingSenderId: "1044203467991",
    appId: "1:1044203467991:web:f7adbaa64dae14ad4bec92",
    measurementId: "G-NS789PQCZ4"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	//base de datos
	var database = firebase.database();
	var storage = firebase.storage();

angular.module('starter.controllers', [])

//Controlador Para registro de usuario
.controller("registroCtrl",function($scope,$state){
	//cerrar sesion del  usuario
	firebase.auth().signOut().then(function(){
	}).catch(function(error){
		var mensaje = error.message;
		console.log(mensaje);
	})
	//variable UID del usuario registrado
	$scope.uid = "";

	$scope.obtener = function(user){
		//Crear usuario con la autenticacion
		firebase.auth().createUserWithEmailAndPassword(user.email, user.contra).then(function a(y){
			// Notificacion que se creo el usuario
			swal("Tu cuenta se ha creado correctamente");
			//obteber uid del ususario refistrado
			$scope.uid = y.user.uid;
			//Almacena el ususrio en la base de datos
			firebase.database().ref("/users").child($scope.uid).set({
				correo: user.email,
				nombre: user.nombre,
				uid: $scope.uid
			})
		})
		//Cerrar sesion del  usuario
		firebase.auth().signOut().then(function(){
		}).catch(function(error){
			var mensaje = error.message;
			console.log(mensaje);
		})

		//Borra el contenido del formulario
		$scope.user = {};
		//Re direccionar a la vista del LOGIN
		$state.go("login");
	}
})


//Controlador vista inicio
.controller("loginCtrl",function($scope,$state,$rootScope){

	$rootScope.uid;
	$rootScope.user
	
	$scope.Inicio = function(userL){
		//Inicio de sesion con firebase
		firebase.auth().signInWithEmailAndPassword(userL.email,userL.password).then(function b(x){
			swal("Bienvenido a tiendas Max");

				//Get data user
				firebase.auth().onAuthStateChanged(function(user) {
					$rootScope.user = user;
				  if (user) {
				  	$rootScope.uid = user.uid;
				  }
				});

			$state.go("tab.dash")
		}).catch(function(error){
			var mensaje = error.message;
			console.log(mensaje);
		})
	}

})

//Controlador vista principal
.controller("tutorialCtrl",function($scope){

})

//Controlador vista products mostrar productos por categoria filtrados

.controller("productsCtrl",function($scope, $rootScope){

	$rootScope.carrito = [];
	$rootScope.favoritos = [];
	$rootScope.vista;
	$rootScope.nada;
	//Agrega Productos al Carrito
	$scope.agregar = function(x,cantidad){
		x["cantidad"]=parseInt(cantidad);
		$rootScope.carrito.push(x);
			swal("SI", "Se ha agregado el producto", "success");
		$rootScope.vista = true;
		$rootScope.subtotal = $rootScope.carrito[0].precio * $rootScope.carrito[0].cantidad;
		$rootScope.nada = false;
	}

	//Agregar Productos a Favoritos

	$scope.addFavorites = function(y){
		$rootScope.favoritos.push(y);
		swal("SI", "Se ha agregado a favoritos", "success")
	}

})

//controlador vista de productos por categoria sin filtrar
.controller('DashCtrl', function($scope,$rootScope, $state) {


	$rootScope.name;
	$rootScope.email;
	$rootScope.foto;

	firebase.database().ref("/users/"+$rootScope.uid).once("value").then(function(data){
		$rootScope.name = data.val().nombre;
		$rootScope.email = data.val().correo;
		$rootScope.foto = data.val().foto;
	})


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
			descripcion:"Televisores, Audio y Reproductores.",
			banner: "img/Television.jpg"
		},
		{
			nombreCategoria : "CELULARES",
			imagen : "img/tag2.png",
		 	descripcion:"Tigo, Claro y Liberados.",
		 	banner: "img/Celulares.jpg"
		},
		{
			nombreCategoria : "LINEA BLANCA",
			imagen : "img/tag3.png",
			descripcion:"Refrigeracion, Estufas, Lavadoras.",
			banner: "img/Refrigeradores.jpg"
		},
		{
			nombreCategoria : "VIDEOJUEGOS",
			imagen : "img/tag4.png",
			descripcion:"Playstation, Xbox One, Pc Gaming.",
			banner: "img/VideoJuegos.jpg"
		},
		{
			nombreCategoria : "COMPUTACION",
			imagen : "img/tag5.png",
			descripcion:"Laptop, Desktop, Accesorios.",
			banner: "img/Computadoras.jpg"
		},
		{
			nombreCategoria : "AUDIO",
			imagen : "img/tag6.png",
			descripcion:"Audifonos, Fiestas, Bocinas Personales.",
			banner: "img/AudioSonido.jpg"
		}
  
	]

	//mostrar productos filtrados por categoria
	$scope.viewProducts = function(ncategoria){
		$rootScope.nombreCategoria = ncategoria;
		$state.go("products")
	}

})

.controller('carritoCtrl', function($scope, Chats, $rootScope) {
	
	if($rootScope.favoritos == undefined){
		$rootScope.vista = false;
		$rootScope.nada = true;
	}

})

//controlador favoritos
.controller("favoritosCtrl", function($scope, $rootScope, $state){

	if($rootScope.carrito == undefined){
		$rootScope.vista = false;
		$rootScope.nada = true;
	}

})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller("profileCtrl", function($scope,$rootScope,$state){

	var uploadFoto;
	var foto;
	var nav;
	var file;
	var name;

	// Preload and Preview Image
	$("#foto").on("change",function(){
	    var uploadFoto = document.getElementById("foto").value;
	    var foto       = document.getElementById("foto").files;
	    var nav = window.URL || window.webkitURL;

	    if(uploadFoto !=''){
	        var type = foto[0].type;
	        var name = foto[0].name;
	        if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png'){
	            $("#img").remove();
	            //$(".delPhoto").addClass('notBlock');
	            $('#foto').val('');
	            return false;
	        }else{
	            $("#img").remove();
	            //$(".delPhoto").removeClass('notBlock');
	            var objeto_url = nav.createObjectURL(this.files[0]);
	            file = this.files[0];
	            $(".prevPhoto").append("<img class='previewProfile' id='img' src="+objeto_url+">");
	            $(".upimg label").remove();
	        }
	    }else{
	        alert("No selecciono foto");
	        $("#img").remove();
	    }
	});

	$scope.saveChange = function() {
		// Crea una referencia al storage
		var refStorage = storage.ref("Users/").child(file.name);
		//Almacena la imagen dentro de la referencia del storage
		var uploadTask = refStorage.put(file).then(function(result){
			//Adquirir el URL y el storage
			refStorage.getDownloadURL().then(function(result){
				var enlace = result;

				//Crear una referencia hacia el usuario
				var database = firebase.database().ref().child("users/"+ $rootScope.uid);
				database.update({
					foto: enlace
				})
			})
		})
	}

})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
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

  MyApp=angular.module("MyApp",[])

MyApp.controller('productoCtrl', function($scope) {
	var storage = firebase.storage();
	// Variable que almacena el archivo que se carga
	var fileUpload = document.getElementById("imagenProducto");
	var file;
	// Guarda las características propias de la imagen
	fileUpload.addEventListener('change', function(evt) {
		file = evt.target.files[0];
	})

	$scope.guardar = function(producto){
		// creo una referencia al lugar donde guardaremos el archivo
		var refStorage = storage.ref('productos/').child(file.name);
		// Comienzo la tarea de cargado
		var uploadTask = refStorage.put(file).then(function(result){
		//Get URL and store to pass
			refStorage.getDownloadURL().then(function(result){
				// Se agrega el enlace de ubicación de archivo para cargar a la DB
				producto['imagen'] = result;
				// Se envían los cambios incluyendo la imagen
				firebase.database().ref('products').push(producto);
				// Se vacía el diccionario para borrar contenido en formulario
				$scope.producto = {};
				// Se agrega un mensaje de éxito
				alert("Se cargó correctamente");
			});
		}); 
	}
})




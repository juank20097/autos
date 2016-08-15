angular.module('starter.controllers', [])


.controller('PopupCtrl', function($scope, $ionicPopup, $timeout) {
 // Alerta de dialogo
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Informacion',
       template: 'App desarrollado por :<br/><br/><p style="text-align:center"><img height="150" width="140" src="img/yo.png"><br/><strong>Juan Carlos Estévez</strong></p>'
     });
   };
})

.controller ('AutosCtrl',['$scope','$http','$state',function($scope, $http, $state){
  $http.get('http://127.0.0.1:8080/restAuto/info/auto')
  .success(function(data){
  	$scope.autos = data.autos;
  });

  // metodo para mostrar contenidos resumindos
  $scope.toggleDescripcion = function(item){
    item.resumido = !item.resumido;
  }

}])

.controller ('DatosCtrl',['$scope','$http','$state',function($scope, $http, $state){
  $http.get('http://127.0.0.1:8080/restAuto/info/auto')
  .success(function(data){
    console.log(data.autos[$state.params.id].id);
    $scope.data = data.autos[$state.params.id];
  });
}])


.controller ('EditarCtrl',['$scope','$http','$state',function($scope, $http, $state){
  $http.get('http://127.0.0.1:8080/restAuto/info/auto')
  .success(function(data){
    console.log(data.autos[$state.params.id].id);
    $scope.data = data.autos[$state.params.id];
  });
}])


.controller ('MapCtrl',function($scope,$state,$ionicLoading){
 $ionicLoading.show({});

 var miUbicacion={}

 var destino ={}

  var ibarra = {
            lat: 0.3391763,
            lng: -78.12223360000002
        }

  var atuntaqui = {
            lat: 0.3323851999999999,
            lng: -78.21628329999999
        }

  var otavalo = {
            lat: 0.2343005000000001,
            lng: -78.26106720000001
        }

  var pimampiro = {
            lat: 0.3907438,
            lng: -77.94102509999999
        }

  var urcuqui = {
            lat: 0.4200379999999999,
            lng: -78.1941122
        }

  map = function() { 
            if ($state.params.id === "1"){
              console.log($state.params.id)
              destino = {
              center: atuntaqui,
                zoom: 16
               }
           
            }
              if ($state.params.id === "2"){
                 
               console.log($state.params.id)
               destino = {
              center: ibarra,
                zoom: 16
            }
           
            }
              if ($state.params.id === "3"){
              
               console.log($state.params.id)
               destino = {
              center: otavalo,
                zoom: 16
            }
           
            }
              if ($state.params.id === "4"){
                
               console.log($state.params.id)
               destino = {
              center: urcuqui,
                zoom: 16
            }
           
            }
              if ($state.params.id === "5"){
                
               console.log($state.params.id)
               destino = {
              center: pimampiro,
                zoom: 16
            }
      
            }
            var map = new google.maps.Map(document.getElementById("map"), destino);
            $scope.map = map;
            addMarker(destino.center);
            locateMe();
            $ionicLoading.hide();
             }

             //metodo para obtener la ubicacion  propia 
  locateMe = function(){
    $ionicLoading.show({});

    navigator.geolocation.getCurrentPosition(function(pos){
      $ionicLoading.hide();

      miUbicacion.lat =pos.coords.latitude;
      miUbicacion.lng =pos.coords.longitude;

      $ionicLoading.hide();
      //addMarker(miUbicacion);


    },function(error){
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Error de localizacion',
        template : error.message,
        okType: 'button-assertive'
      });
    })
  }

  //metodo para añadir un marcador en el mapa
  addMarker =function(ubicacion){
    //arreglo de todos los marcadores
    var markIcon ='img/m1.png';
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: ubicacion,
      //opcion de mover el marker
      draggable:false,

      //adicion de etiquetas del marcador(solo un caracter)
      //label:"Y"
      //label:String (markerCount),

      //poner icono a los marcadores
      

      //agregar animacion a los marker
      //animation:google.maps.Animation.DROP
      animation:google.maps.Animation.BOUNCE
    })
  }

  $scope.trazarRuta = function(){
     $ionicLoading.show({});
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map:$scope.map
    });

    var request ={
      destination: destino.center,
      origin : miUbicacion,
      travelMode: google.maps.TravelMode.DRIVING
    }

    var directionsService = new google.maps.DirectionsService();

    directionsService.route(request,function(response,status){
      if (status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      }
    })
    $ionicLoading.hide();
  }

  $scope.restart =function(){
    $ionicLoading.show({});
    window.location.reload();
    $ionicLoading.hide();
  }
       
       if (document.readyState === "complete") {
           map();
           //metodo para recargar la pagina y cargar el mapa
           $ionicLoading.show({});
           reloadMap = function() {
              window.location.reload();
            }
            reloadMap();
            $ionicLoading.hide();
        } else {
            google.maps.event.addDomListener(window, 'load', map);
        }

         });





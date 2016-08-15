// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //metodo para comprobar si tengo o no internet en el dispositivo
    //instalar el plugin de cordova : cordova-plugin-network-information
    if (window.Connection){
      if (navigator.connection.type == Connection.NONE){
       $ionicPopup.alert({
        title: "Internet Desactivado",
        content: "El servicio de internet esta desactivado en su dispositivo."
        }).then(function(result) {
        ionic.Platform.exitApp();
        });
      }
    }


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  //metodo para cargar el menu lateral y el mismo en todas las paginas
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'PopupCtrl'
  })

    //metodo de ingreso a una vista
  .state('app.editar', {
    url: '/editar/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/editar.html',
        controller: 'EditarCtrl'
      }
    }
  })

  //metodo de ingreso a una vista
  .state('app.datos', {
      url: '/datos/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/datos.html',
          controller: 'DatosCtrl'
        }
      }
    })

    //metodo de ingreso a una vista
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
        }
      }
    })

     //metodo de ingreso a una vista
    .state('app.sitios', {
      url: '/sitios',
      views: {
        'menuContent': {
          templateUrl: 'templates/sitios.html',
        }
      }
    })

     //metodo de ingreso a una vista
    .state('app.gmap', {
      url: '/gmap/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/gmap.html',
           controller: 'MapCtrl'
        }
      }
    })

    //metodo de ingreso a una vista
  .state('app.autos', {
    url: '/autos',
    views: {
      'menuContent': {
        templateUrl: 'templates/autos.html',
        controller: 'AutosCtrl'
      }
    }
  });

  // SI no encuentra ninguna vista lanza la siguiente
  $urlRouterProvider.otherwise('/app/home');
});

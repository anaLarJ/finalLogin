angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
})


/*.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})*/

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: '1. We admitted that we were powerless over our addiction; that our lives had become unmanageable.', id: 1 },
    { title: '2. We came to believe that a Power greater than ourselves could restore us to sanity.', id: 2 },
    { title: '3. We made a decision to turn our will and our lives over to the care of God as we understood Him.', id: 3 },
    { title: '4. We made a searching and fearless moral inventory of ourselves.', id: 4 },
    { title: '5. We admitted to God, to ourselves, and to another human being the exact nature of our wrongs.', id: 5 },
    { title: '6. We were entirely ready to have God remove all these defects of character', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ListCtrl', function ($scope,$ionicPlatform, $state, NotesDataService) {
  $scope.$on('$ionicView.enter', function(e) {
      NotesDataService.getAll(function(data){
        $scope.itemsList = data
      })
  })

  $scope.gotoEdit = function(idNote){
    $state.go('form', {id: idNote})
  }
})

.controller('FormCtrl', function ($scope, $stateParams, $ionicPopup, $state, NotesDataService) {
  $scope.$on('$ionicView.enter', function(e) {
    initForm()
  })

  function initForm(){
    if($stateParams.id){
      NotesDataService.getById($stateParams.id, function(item){
        $scope.noteForm = item
      })
    } else {
      $scope.noteForm = {}
    }
  }
  function onSaveSuccess(){
    $state.go('app.list')
  }
  $scope.saveNote = function(){

    if(!$scope.noteForm.id){
      NotesDataService.createNote($scope.noteForm).then(onSaveSuccess)
    } else {
      NotesDataService.updateNote($scope.noteForm).then(onSaveSuccess)
    }
  }

  $scope.confirmDelete = function(idNote) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete the post',
      template: 'Are you sure ?'
    })

    confirmPopup.then(function(res) {
      if(res) {
        NotesDataService.deleteNote(idNote).then(onSaveSuccess)
      }
    })
  }


});


 

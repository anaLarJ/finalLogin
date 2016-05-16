angular.module('starter.services', ['ngCordova'])

  

  .factory('NotesDataService', function ($cordovaSQLite, $ionicPlatform) {
    var db, dbName = "noteDemo.db"
 
    function useWebSql() {
      db = window.openDatabase(dbName, "1.0", "Note database", 200000)
      console.info('Using webSql')
    }
 
    function useSqlLite() {
      db = $cordovaSQLite.openDB({name: dbName})
      console.info('Using SQLITE')
    }
 
    function initDatabase(){
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS T_NOTE (id integer primary key, title, content)')
        .then(function(res){
 
        }, onErrorQuery)
    }
 
    $ionicPlatform.ready(function () {
      if(window.cordova){
        useSqlLite()
      } else {
        useWebSql()
      }
       
      initDatabase()
    })
 
    function onErrorQuery(err){
      console.error(err)
    }
 
    return {
      createNote: function (note) {
        return $cordovaSQLite.execute(db, 'INSERT INTO T_NOTE (title, content) VALUES(?, ?)', [note.title, note.content])
      },
      updateNote: function(note){
        return $cordovaSQLite.execute(db, 'UPDATE T_NOTE set title = ?, content = ? where id = ?', [note.title, note.content, note.id])
      },
      getAll: function(callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_NOTE').then(function (results) {
            var data = []
 
            for (i = 0, max = results.rows.length; i < max; i++) {
              data.push(results.rows.item(i))
            }
 
            callback(data)
          }, onErrorQuery)
        })
      },
 
      deleteNote: function(id){
        return $cordovaSQLite.execute(db, 'DELETE FROM T_NOTE where id = ?', [id])
      },
 
      getById: function(id, callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_NOTE where id = ?', [id]).then(function (results) {
            callback(results.rows.item(0))
          })
        })
      }
    }
  })
  
  
  /************************* */

  .service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if ((name == 'Ana' && pw == 'secretAna') ||  (name == 'Lea' && pw == 'secretLea') || (name == 'Gustavo' && pw == 'secretGustavo') ) {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
  });


  /************************** */
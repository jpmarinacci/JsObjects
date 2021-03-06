 /**
 * @author Charlie Calvert
 */

var ElfWorld = angular.module('elfworld', ['elfgame'])
.factory('gameEventService', function($rootScope) {
    return {
        message: "",
        
        towerBroadcast: function(message) {
            this.message = message;
            this.broadcastMessage('towerBroadcast');
        },
        
        debugBroadcast: function(message) {
        	this.message = message;
        	this.broadcastMessage('debugBroadcast');
        },
        
        encounterBroadcast: function(message) {
            this.message = message;
            this.broadcastMessage('encounterBroadcast');
        },
        
        broadcastMessage: function(broadcastType) {
            $rootScope.$broadcast(broadcastType);            
        }        
    };    
});

/*.controller('starter', function() {
    game.start();
}); */

function ElfController($scope, gameEventService) {    
    
    $scope.name = "ElfPlayer";
    $scope.eventNote = "no messages";    
    $scope.debugMessages = [];
    
    // This event is fired from inside crafty when a tower is found.  
    // We need to call $apply because we are calling from Crafty, not from Angular.
    $scope.$on('towerBroadcast', function() {        
        // this.$scope.eventNote = gameEventService.message;
        $scope.$apply(function() { $scope.eventNote = gameEventService.message; });
        console.log(gameEventService.message);
    });   
    
    $scope.$on('debugBroadcast', function() {        
        // this.$scope.eventNote = gameEventService.message;
        $scope.$apply(function() { $scope.debugMessages.unshift(gameEventService.message); });
        console.log(gameEventService.message);
    });
     
    $scope.$on('encounterBroadcast', function() {        
        // this.$scope.eventNote = gameEventService.message;
        $scope.$apply(function() { $scope.encounterMessage = gameEventService.message; });
        console.log(gameEventService.message);
    }); 
} 

// ElfPlayer.$inject = ['$scope', 'gameEventService'];        
        

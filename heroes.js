(function(angular) {
  'use strict';
angular.module('heroes', [])
  .service('heroService', HeroService)

  .component('heroes', {
    template: function() {
      return '<h2>Heroes</h2><ng-outlet></ng-outlet>'
    },
    $routeConfig: [
      {path: '/',    name: 'HeroList',   component: 'heroList', useAsDefault: true},
      {path: '/:id', name: 'HeroDetail', component: 'heroDetail'}
    ]
  })

  .component('heroList', {
    template: function() {
      return '<div ng-repeat="hero in $ctrl.heroes" ' +
      '     ng-class="{ selected: $ctrl.isSelected(hero) }">\n' +
        '<a ng-link="[\'HeroDetail\', {id: hero.id}]">{{hero.name}}</a>\n' +
      '</div>'
    },
    controller: HeroListComponent
  })

  .component('heroDetail', {
    templateUrl: function($location) {
      return $location.path();
    },
    bindings: { $router: '<' },
    controller: HeroDetailComponent,
    $canActivate: function() {
      console.log('1');
      return true;
    }
  });


function HeroService($q) {
  var heroesPromise = $q.when([
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' }
  ]);

  this.getHeroes = function() {
    return heroesPromise;
  };

  this.getHero = function(id) {
    return heroesPromise.then(function(heroes) {
      for (var i = 0; i < heroes.length; i++) {
        if (heroes[i].id === id) return heroes[i];
      }
    });
  };
}

function HeroListComponent(heroService) {
  var selectedId = null;
  var $ctrl = this;

  this.$routerOnActivate = function(next) {
    // Load up the heroes for this view
    heroService.getHeroes().then(function(heroes) {
      $ctrl.heroes = heroes;
      selectedId = next.params.id;
    });
  };

  this.isSelected = function(hero) {
    return (hero.id === selectedId);
  };
}

function HeroDetailComponent(heroService) {
  console.log('....'); 
  var $ctrl = this;

  this.$routerOnActivate = function(next) {
    console.log('...'); 
    // Get the hero identified by the route parameter
    var id = next.params.id;
    heroService.getHero(id).then(function(hero) {
      $ctrl.hero = hero;
    });
  };

  this.gotoHeroes = function() {
    var heroId = this.hero && this.hero.id;
    this.$router.navigate(['HeroList', {id: heroId}]);
  };
}
})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
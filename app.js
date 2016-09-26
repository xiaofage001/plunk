(function(angular) {
  'use strict';
angular.module('app', ['ngComponentRouter', 'heroes', 'crisis-center'])

.config(function($locationProvider) {
  $locationProvider.html5Mode(false);
})

.value('$routerRootComponent', 'app')

.component('app', {
  template: function() {
      return '<nav>\n' +
    '  <a ng-link="[\'CrisisCenter\']">Crisis Center</a>\n' +
    '  <a ng-link="[\'Heroes\']">Heroes</a>\n' +
    '</nav>\n' +
    '<ng-outlet></ng-outlet>\n';
    },
    // $routeConfig中的component替换到当前component中的ng-outlet中
    // 路由中只定义子节点，不定义父节点
  $routeConfig: [
    {path: '/crisis-center/...', name: 'CrisisCenter', component: 'crisisCenter', useAsDefault: true},
    {path: '/heroes/...', name: 'Heroes', component: 'heroes' }
  ]
});
})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
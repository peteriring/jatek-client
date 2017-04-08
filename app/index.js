import '@app/style.scss';
import 'bootstrap';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import sanitize from 'angular-sanitize';
import 'angular-bootstrap';
import 'pixi.js/dist/pixi.min';
// Import base modules
import appconfig from '@app/config';
import core from '@app/core';


export default angular.module('demo', [sanitize, uirouter, appconfig, core])
.factory('httpRequestInterceptor', () => ({
  request: config => Object.assign(config, {
    headers: Object.assign(config.headers, {
      'Content-Type': 'application/json',
    }),
  }),
}))
.config($httpProvider => $httpProvider.interceptors.push('httpRequestInterceptor'))
.config(['$urlRouterProvider', u => u.otherwise($injector => $injector.get('$state').go('app.dashboard'))])
.run(['$rootScope', '$state', ($rootScope, $state) => Object.assign($rootScope, { $state })])
.name;

'use strict';

/**
 * @ngdoc overview
 * @name nghtmledApp
 * @description
 * # nghtmledApp
 *
 * Main module of the application.
 */
angular
  .module('nghtmledApp', ["ngHTMLed"])
  .config(["$HTMLedProvider", function($HTMLedProvider){
      $HTMLedProvider.setup({
          langBundle:"properties",
          autoDetect:false,
          langPref:"en-US"
      });
  }]);

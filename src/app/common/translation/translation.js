/**
 Translation module
 */
var p5Translate = angular.module('p5Translate', ['pascalprecht.translate']);

p5Translate.config(function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'translation/locale/p5_locale_',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('fr_FR');
});
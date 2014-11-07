angular.module('directives.util', [])
.directive('confirmedClick', function() {
  return { restrict: 'A',
    link: function(scope, element, attrs) {
        var msg = attrs.confirmMessage || "Are you sure?";
        var clickAction = attrs.confirmedClick;
        element.bind('click',function (event) {
            if ( window.confirm(msg) ) {
                scope.$eval(clickAction);
            }
        });
    }
  };
})
.directive('timestamp', function() {
  return { restrict: 'A',
    require: '^ngModel',
    link: function(scope, element, attrs, ngModel) {
      if(ngModel) { // Don't do anything unless we have a model
        ngModel.$parsers.unshift(function (value) {
          var d = new Date(value);
          var offset = d.getTimezoneOffset();
          var actual = d.getTime() + offset*60*1000;
          return actual;
        });

        ngModel.$formatters.unshift(function (value) {
          var offset = new Date().getTimezoneOffset();
          var actual = value - offset*60*1000;
          return toISOString(actual);
        });

        function toISOString(value) {
          var d = new Date(value);
          return d.getUTCFullYear() +
            '-' + pad( d.getUTCMonth() + 1 ) +
            '-' + pad( d.getUTCDate() ) +
            'T' + pad( d.getUTCHours() ) +
            ':' + pad( d.getUTCMinutes() );
        }

        function pad(number) {
          var r = String(number);
          if ( r.length === 1 ) {
            r = '0' + r;
          }
          return r;
        }

      }
    }
  };
});
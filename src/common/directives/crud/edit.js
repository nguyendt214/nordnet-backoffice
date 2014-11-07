angular.module('directives.crud.edit', [])

// Apply this directive to an element at or below a form that will manage CRUD operations on a resource.
// - The resource must expose the following instance methods: $saveOrUpdate(), $id() and $remove()
.directive('crudEdit', ['$parse', function($parse) {
  return {
    // We ask this directive to create a new child scope so that when we add helper methods to the scope
    // it doesn't make a mess of the parent scope.
    // - Be aware that if you write to the scope from within the form then you must remember that there is a child scope at the point
    scope: true,
    // We need access to a form so we require a FormController from this element or a parent element
    require: '^form',
    // This directive can only appear as an attribute
    link: function(scope, element, attrs, form) {
      // We extract the value of the crudEdit attribute
      // - it should be an assignable expression evaluating to the model (resource) that is going to be edited
      var resourceGetter = $parse(attrs.crudEdit);
      var resourceSetter = resourceGetter.assign;
      // Store the resource object for easy access
      var resource = resourceGetter(scope);
      // Store a copy for reverting the changes
      var original = angular.copy(resource);

      // The following functions should be triggered by elements on the form
      // - e.g. ng-click="save()"
      scope.save = function() {
        if(resource.id) {
          resource.$update().then(function(user) {
           scope.onSave && scope.onSave(user);
         }, function(error) {
           scope.onError && scope.onError();
         });
        } else {
          resource.$save().then(function(user) {
           scope.onSave && scope.onSave(user);
         }, function(error) {
           scope.onError && scope.onError();
         });
        }
      };
      scope.revertChanges = function() {
        resource = angular.copy(original);
        resourceSetter(scope, resource);
        form.$setPristine();
      };
      scope.remove = function() {
        if(resource.id) {
          resource.$remove().then(function(user) {
             scope.onRemove && scope.onRemove(user);
           }, function(error) {
             scope.onError && scope.onError();
           });
        }
      };

      // The following functions can be called to modify the behaviour of elements in the form
      // - e.g. ng-disable="!canSave()"
      scope.canSave = function() {
        return form.$valid && !angular.equals(resource, original);
      };
      scope.canRevert = function() {
        return !angular.equals(resource, original);
      };
      scope.canRemove = function() {
        return resource.id;
      };
      /**
       * Get the CSS classes for this item, to be used by the ng-class directive
       * @param {string} fieldName The name of the field on the form, for which we want to get the CSS classes
       * @return {object} A hash where each key is a CSS class and the corresponding value is true if the class is to be applied.
       */
      scope.getCssClasses = function(fieldName) {
        var ngModelController = form[fieldName];
        return {
          error: ngModelController.$invalid && !angular.equals(resource, original),
          success: ngModelController.$valid && !angular.equals(resource, original)
        };
      };
      /**
       * Whether to show an error message for the specified error
       * @param {string} fieldName The name of the field on the form, of which we want to know whether to show the error
       * @param  {string} error - The name of the error as given by a validation directive
       * @return {Boolean} true if the error should be shown
       */
      scope.showError = function(fieldName, error) {
        return form[fieldName].$error[error];
      };
    }
  };
}]);
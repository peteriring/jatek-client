import template from '@app/core/view.html';
import controller from '@app/core/controller';

export default function routes($stateProvider) {
  $stateProvider
    .state('app', {
      template,
      abstract: true,
      controller: controller.UID,
      resolve: {},
    });
}

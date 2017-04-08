import template from '@app/dashboard/view.html';
import controller from '@app/dashboard/controller';

export default function routes($stateProvider) {
  $stateProvider
    .state('app.dashboard', {
      template,
      url: '/dashboard',
      controller: controller.UID,
      resolve: {},
      data: {
        class: 'dashboard',
      },
    });
}

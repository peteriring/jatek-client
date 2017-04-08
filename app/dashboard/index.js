import '@app/dashboard/style.scss';
import routes from '@app/dashboard/routes';
import controller from '@app/dashboard/controller';
import utils from '@app/utils';

export default angular.module('dashboard', [utils])
  .config(routes)
  .controller(controller.UID, controller)
  .name;

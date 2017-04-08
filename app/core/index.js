import '@app/core/style.scss';
import routes from '@app/core/routes';
import controller from '@app/core/controller';
import dashboard from '@app/dashboard';

export default angular.module('core', [dashboard])
  .config(routes)
  .controller(controller.UID, controller)
  .name;

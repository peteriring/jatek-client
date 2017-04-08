import character from '@app/utils/character';
import controls from '@app/utils/controls';
import loader from '@app/utils/loaders';
import socket from '@app/utils/socket';
import app from '@app/utils/app';

export default angular.module('utils', [])
  .service(character.UID(), character)
  .service(controls.UID(), controls)
  .service(loader.UID(), loader)
  .service(socket.UID(), socket)
  .service(app.UID(), app)
  .name;

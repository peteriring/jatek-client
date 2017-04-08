export default angular.module('config', [])
  .constant('ENV', {
    env: '@@env',
    apiUrl: '@@apiUrl',
    socketUrl: '@@socketUrl',
    port: '@@port',
  })
  .name;

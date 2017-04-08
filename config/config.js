export default angular.module('config', [])
  .constant('ENV', {
    env: '@@env',
    apiUrl: '@@apiUrl',
    port: '@@port',
  })
  .name;

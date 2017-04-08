export default angular.module('config', [])
  .constant('ENV', {
    env: 'local',
    apiUrl: 'http://mocked_url/',
    port: '3000',
  })
  .name;

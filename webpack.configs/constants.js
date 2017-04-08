const fs = require('fs');
const path = require('path');
const convict = require('convict');
require('dotenv').config();

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'demo', 'development', 'local', 'test'],
    default: 'local',
    env: 'NODE_ENV',
  },
  apiUrl: {
    doc: 'url of the backend',
    format: function check(value) {
      if (!/^https?/.test(value)) {
        throw new Error('must have a protocol');
      }
    },
    default: 'http://mocked_url/',
    env: 'API_URL',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
});

module.exports = (() => {
  config.validate({ strict: true });
  const settings = config.getProperties();
  const stream = fs.createWriteStream(path.join(__dirname, '..', 'app', 'config.js'));
  fs.createReadStream(path.join(__dirname, '..', 'config', 'config.js'), 'utf-8')
    .on('data', chunk => stream.write(chunk
      .replace('@@env', settings.env)
      .replace('@@apiUrl', settings.apiUrl)
      .replace('@@port', settings.port)
    ));
  console.log('CONFIG:', config.toString());
  return config;
})();

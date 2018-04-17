/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      uri: process.env.MONGODB_URI,
      options: {
        user: requireProcessEnv('MONGOUSER'),
        pass: requireProcessEnv('MONGOPASS'),
        db: {
          safe: true
        },
        useMongoClient: true
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/back-end-io-t-test',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/back-end-io-t-test',
      port: process.env.PORT || 8080,
      options: {
        user: requireProcessEnv('MONGOUSER'),
        pass: requireProcessEnv('MONGOPASS'),
        db: {
          safe: true
        },
        useMongoClient: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/back-end-io-t-test',
      options: {
        user: requireProcessEnv('MONGOUSER'),
        pass: requireProcessEnv('MONGOPASS'),
        db: {
          safe: true
        },
        useMongoClient: true
      }
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
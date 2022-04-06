const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const logger = require('../utils/loggers/common.logger')

const envDir = path.join(__dirname, '..')
let env = null
let envFile = null

switch (process.env.NODE_ENV) {
case 'local':
    envFile = '.env.local'
    break
// case 'qa':
//     envFile = '.env.qa'
//     break
// case 'qa_local':
//     envFile = '.env.qa_local'
//     break
// case 'stage':
//     envFile = '.env.stage'
//     break
// case 'stage_local':
//     envFile = '.env.stage_local'
//     break
// case 'docker':
//     envFile = '.env.docker'
//     break
// case 'production':
//     envFile = '.env.production'
//     break
// case 'prod_local':
//     envFile = '.env.prod_local'
//     break
// case 'sap':
//     envFile = '.env.sap'
//     break
default:
    envFile = '.env.local'
    break
}

if (fs.existsSync(path.join(envDir, envFile))) {
    logger.info('[APP] .env file found, loading...')
    env = dotenv.config({
        path: path.join(envDir, envFile)
    })
} else {
    logger.warn('[APP] .env file not found, loading defaults...')
    env = dotenv.config({
        path: path.join(envDir, '.env.development')
    })
}

module.exports = env

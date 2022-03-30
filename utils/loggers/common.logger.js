const { red } = require('colors')
const winston = require('winston')
const os = require('os')
const { createLogger, format, transports } = winston
const { combine, timestamp, label, printf, colorize } = format
const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})
const path = require('path')

const logDir = path.resolve(os.homedir(), '.curator-server')

const logger = createLogger({
    format: combine(
        label({ label: process.env.NODE_ENV === 'local' ? red('Logger') : 'Logger' }),
        // format.colorize({ all: true }),
        format.splat(),
        format.simple(),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize({ all: process.env.NODE_ENV === 'local' }),
                myFormat
            ),
            level: 'silly'
        }),
        new transports.File({ format: myFormat, filename: path.resolve(logDir, 'info.log'), level: 'info' }),
        new transports.File({ format: myFormat, filename: path.resolve(logDir, 'error.log'), level: 'error' })
    ]
})

logger.trace = function () {
    logger.silly(...arguments)
}

logger.fatal = function () {
    logger.error(...arguments)
}

module.exports = logger

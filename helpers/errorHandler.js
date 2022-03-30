module.exports = () => {
    function _buildError (err, statusCode) {
        // Err is string or object simulating error
        if (!(err instanceof Error)) {
            err = new Error(err.message)
        }
        // Add http code
        if (!err.statusCode) {
            err.statusCode = statusCode || 500
        }
        return err
    }

    /**
     * Send error response to the requester using status code from the error argument
     * or setting a default one equal to 500 Internal Server Error.
     *
     * *Note that the error is logged and wrapped via model.error() called from within
     * the models and utility modules.
     */
    function sendError (err, req, res, additinalData = {}) {
        const wrappedError = _buildError(err, err.httpStatusCode)
        let errToSend = {}
        errToSend.title = wrappedError.message || ''

        // ...err - if custom error object is thrown
        errToSend = { ...errToSend, ...err, ...additinalData }

        res.header('Content-Type', 'application/problem+json')
        res.status(wrappedError.statusCode).send(errToSend)
    }

    return {
        sendError
    }
}

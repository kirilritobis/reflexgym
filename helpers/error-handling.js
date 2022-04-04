/**
 * Use these errors in your business logic to have proper status codes
 * in the HTTP responses
 * 400 Bad Request
 * The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).[32]
 * 401 Unauthorized (RFC 7235)
 * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.[33] 401 semantically means "unauthorised",[34] the user does not have valid authentication credentials for the target resource.
 * Note: Some sites incorrectly issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website.[citation needed]
 * 403 Forbidden
 * The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed). This code is also typically used if the request provided authentication via the WWW-Authenticate header field, but the server did not accept that authentication. The request should not be repeated.
 * 404 Not Found
 * The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
 * 440 Session Expired
 * Indicates that the session has expired. Not part of the standard, but used by Microsoft also.
 * 423 Locked
 * Indicates TOTP Verification code has been used and now it is locked.
 */

 class BadRequest extends Error {
    get httpStatusCode () {
        return 400
    }

    get message () {
        return 'Bad Request'
    }
}

class Unauthorized extends Error {
    get httpStatusCode () {
        return 401
    }

    get message () {
        return 'Unauthorized Request'
    }
}

class Forbidden extends Error {
    get httpStatusCode () {
        return 403
    }

    get message () {
        return 'Forbidden Request'
    }
}

class NotFound extends Error {
    get httpStatusCode () {
        return 404
    }

    get message () {
        return 'Not Found'
    }
}

class SessionExpired extends Error {
    get httpStatusCode () {
        return 440
    }

    get message () {
        return 'Control System session expired'
    }
}

class Locked extends Error {
    get httpStatusCode () {
        return 423
    }

    get message () {
        return 'Verification code has been used and now it is locked. Please use another code'
    }
}

const asyncMiddleware = middleware => {
    const wrap = async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (err) {
            next(err)
        }
    }
    return wrap
}

const apiErrorHandler = (err, req, res, next) => {
    const statusCode = err.httpStatusCode || 500
    res.status(statusCode).json({ error: err.message || String(err) })
}

module.exports = {
    apiErrorHandler,
    asyncMiddleware,
    BadRequest,
    Unauthorized,
    SessionExpired,
    Forbidden,
    NotFound,
    Locked
}

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({ status: 'success', message, data });
  }

  static error(res, message = 'Error', statusCode = 500, details = null) {
    const errorResponse = { status: 'error', message };
    if (details) errorResponse.details = details;
    return res.status(statusCode).json(errorResponse);
  }
}

module.exports = { AppError, ApiResponse };

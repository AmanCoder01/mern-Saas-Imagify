

class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export const globalErrorhandler = (err, req, res, next) => {
    console.error(err.stack); //log the erro stack

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: "Error",
            message: err.message,
        });
    }

    //handle mongoose validation ->
    else if (err.name === "validationError") {
        return res.status(400).json({
            status: "error",
            message: "validation Error",
        });
    } else {
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occured",
        });
    }
};

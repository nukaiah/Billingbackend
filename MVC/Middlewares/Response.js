function sendResponse(res, status, message, data = null) {
    res.status(200).json({
        status,
        message,
        data
    });
}


function sendErrorResponse(res, status, message, data = null) {
    res.status(400).json({
        status,
        message,
        data
    });
}


module.exports = {sendResponse,sendErrorResponse};

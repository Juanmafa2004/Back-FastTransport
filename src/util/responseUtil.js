const sendResponse = (res, code = 200, msg = 'OK', data = null) => {
    return res.status(code).json({
        code,
        msg,
        data,
    });
};

// Middleware global para manejar errores
const handleError = (err, req, res, next) => {
    console.error(err);
    const code = err.code || 500;
    const msg = err.msg || 'Error interno del servidor';

    res.status(code).json({
        code,
        msg,
        data: null,
    });
};

export {
    sendResponse,
    handleError,
};
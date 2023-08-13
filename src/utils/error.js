const notFound=(message="Resource not found")=>{
    const error = new Error(message);
    error.status = 404;
    return error;
}

const invalidParams=(message="Expected resources have not been provided")=>{
    const error = new Error(message);
    error.status = 400;
    return error;
}

module.exports = {
    notFound,
    invalidParams
}
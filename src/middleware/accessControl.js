exports.main = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Access-Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.send(200);
        // console.info(JSON.stringify({
        //     requestPath: req.path,
        //     requestMethod: 'options',
        //     httpStatus: 200
        // }));
    } else {
        next();
    }
};

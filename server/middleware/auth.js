const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        let decodedData;

        if(token) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } 

        next();
    } catch (error) {
        console.log(error);
    }
}

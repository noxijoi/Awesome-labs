const jwt = require('jsonwebtoken');
const appConfig = require("../config");

module.exports = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if(!token) return res.status(401).send("Access denied. No token provided.");
    const tokenType = token.substring(0, token.indexOf(" "));
    token = token.substring(tokenType.length + 1);
    try{
        const decoded = jwt.verify(token, appConfig.auth.privateKey);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
};

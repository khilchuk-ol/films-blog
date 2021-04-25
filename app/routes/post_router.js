import express from 'express';

const ALLOWED_IPS = [
    '127.0.0.1',
    '123.456.7.89'
];

const api = express.Router();

api.use(function(req, res, next) {
    if(ALLOWED_IPS.indexOf(req.ip) === -1) {
        res.status(401).send('Not authorized!');
    } else {
        next();
    }
});

api.get('/:id', function(req, res) {

});

export default api;
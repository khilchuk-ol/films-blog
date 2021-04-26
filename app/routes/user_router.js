import passport from 'passport';
import express from 'express';

const ALLOWED_IPS = [
    '127.0.0.1',
    '123.456.7.89'
];

const ensureAuthenticated = (reg, res, next) => {
    if(req.isAuthenticated) {
        next();
    }
    else {
        req.flash('info', 'You must be logged in to see this page');
        res.redirect('/login');
    }
};

const api = express.Router();

api.use(function(req, res, next) {
    if(ALLOWED_IPS.indexOf(req.ip) === -1) {
        res.status(401).send('Not authorized!');
    } else {
        next();
    }
});

//login
api.get('/login', (req, res) => {

});

api.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

//logout
api.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//set user as local variable, so that views can see it
api.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

//edit profile
api.get("/edit", ensureAuthenticated, function(req, res) {

});

api.post("/edit", ensureAuthenticated, function(req, res) {

    /*req.user.displayName = req.body.displayname;
    req.user.bio = req.body.bio;
    req.user.save(function(err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });*/
    
});

export default api;
const	user 	    = require('express').Router()
	,	userDB 		= require(process.env.EVENT_HOME + 'modules/db/user')
    ,   jwt         = require(process.env.EVENT_HOME + 'modules/auth/jwt')
	,	error 		= require(process.env.EVENT_HOME + 'modules/error');


user.get('/:user', error.router.validate('params', {
	user: /^[ÄÜÖäöüA-Za-z0-9\s]{4,50}$/
}), jwt.requireAuthentication, (req, res) => {
    let userRequest;

    if (req.params.user === 'self') {
        userRequest = Promise.resolve(req.user);
    } else {
        userRequest = userDB.getUserObjectByProperty('name', req.params.user);
    }

	userRequest.then((userObject) => {
		res.status(200).send(Object.assign({}, req.user, {salt: '', hash: ''}));
	})
	.catch(error.router.internalError(res));
});

module.exports = user;
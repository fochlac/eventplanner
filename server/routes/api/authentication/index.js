const	auth 	= require('express').Router()
	,	userDB 	= require(process.env.EVENT_HOME + 'modules/db/user')
	,	error 	= require(process.env.EVENT_HOME + 'modules/error')
	,	jwt 	= require(process.env.EVENT_HOME + 'modules/auth/jwt')
	, 	crypto  = require(process.env.EVENT_HOME + 'modules/crypto')
    ;


auth.post('/', error.router.validate('body', {
	user: /^[ÄÜÖäöüA-Za-z0-9\s]{5,50}$/,
	hash: /^[A-Za-z0-9\s+/]*$/
}), (req, res) => {
    let userObj;

	userDB.getUserObjectByProperty('name', [req.body.user])
    .then(userObject => {
        userObj = userObject;
        return userObject;
    })
	.then(crypto.verifyUser(req.body.hash))
	.then(jwt.createToken)
	.then(token => {
		res
        .status(200)
        .cookie('jwt', token, { secure:true, maxAge: 604800000, httpOnly: true })
        .json({
            user: userObj,
            plans: []
        });
	})
	.catch(err => {
		if (err && err.type === 'InvalidHash') {
            console.log(req.originalIP);
			error.router.authError(res, req.connection.remoteAddress);
		} else {
			error.router.internalError(res)(err);
		}
	});
});

module.exports = auth;
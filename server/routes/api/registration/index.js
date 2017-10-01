const	registration 	= require('express').Router()
	,	userDB 			= require(process.env.EVENT_HOME + 'modules/db/user')
	,	error 			= require(process.env.EVENT_HOME + 'modules/error')
	,	log				= require(process.env.EVENT_HOME + 'modules/log')
	,	jwt 			= require(process.env.EVENT_HOME + 'modules/auth/jwt')
	, 	crypto  		= require(process.env.EVENT_HOME + 'modules/crypto');


registration.post('/', error.router.validate('body', {
	user: /^[ÄÜÖäöüA-Za-z0-9\s]{5,50}$/,
	hash: /^[A-Za-z0-9\s/+]*$/
}), (req, res) => {
	let userObj;

	log(6, 'Creating User')

	crypto.createUserHash(req.body.hash)
	.then(hashObj => {
		console.log(hashObj);

		return userDB.createUser({
		name: req.body.user,
		hash: hashObj.hash,
		salt: hashObj.salt,
		role: 'user'
	})})
	.then((result) => {
		if (result.success) {
			userObj = result.user;
			return result.user;
		} else {
			log(3, 'Failed creating user. error: ', result.message);
			res.status(result.status).send(result.message);
			return Promise.reject();
		}
	})
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
	.catch(error.router.internalError(res));
});

module.exports = registration;
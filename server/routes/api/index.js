const 	routes 		    = require('express').Router()
    ,   jwt 		    = require(process.env.EVENT_HOME + '/modules/auth/jwt')
	,	registration 	= require('./registration')
	,	authentication 	= require('./authentication')
    ,   user            = require('./user')
	,	github 		    = require('./github');

routes.use('/github', github);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/authentication', authentication);
routes.use('/registration', registration);
routes.use('/user', jwt.checkToken, user);

module.exports = routes;
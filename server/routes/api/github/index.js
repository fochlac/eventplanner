const	github = require('express').Router()
	,   exec = require('child_process').execFile
    ,   hmac = require(process.env.EVENT_HOME + 'modules/auth/hmac')(process.env.GITHUB_SECRET, 'X-Hub-Signature');

github.post('/triggerBuild', hmac, (req, res) => {
    exec(process.env.EVENT_HOME + "scripts/build", (error, stdout, stderr) => {
        console.log(stdout + error + stderr);
    });
    res.status(200).send();
});

module.exports = github;
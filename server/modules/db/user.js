const   getConnection   = require(process.env.EVENT_HOME + 'modules/db')
    ,   mysql           = require('mysql')
    ,   log             = require(process.env.EVENT_HOME + 'modules/log')
    ,   error           = require(process.env.EVENT_HOME + 'modules/error');

function reduceUserPlansToArray(result) {
    let reducedResult,
        arrayResult = [],
        runvar;

    reducedResult = result.reduce((acc, row) => {
        if (acc[row.id]) {
            acc[row.id].plans.push({
                id: row.userPlanId,
                active: row.planActive,
                planId: row.planId,
                imageUrl: row.planImageUrl,
                name: row.planName,
                note: row.planNote
            });
        } else {
            acc[row.id] = {
                id: row.id,
                name: row.name,
                hash: row.hash,
                salt: row.salt,
                role: row.role,
                plans: row.userPlanId ? [{
                    id: row.userPlanId,
                    active: row.planActive,
                    planId: row.planId,
                    imageUrl: row.planImageUrl,
                    name: row.planName,
                    note: row.planNote
                }] : []
            };
        }

        return acc;
    }, {});

    for (runvar in reducedResult) {
        arrayResult.push(reducedResult[runvar]);
    }

    return arrayResult;
}

module.exports = {
    getUserObjectByProperty: (prop, val) => {
        return Promise.resolve([]);
        return getConnection()
        .then (myDb => {
            return new Promise((resolve, reject) => myDb.query(`select * from userlist where ${prop} = ${mysql.escape(val)}`, (err, result) => {
                myDb.release();
                if (err) {
                    log(2, 'modules/db/user:getUserObjectByProperty', err);
                    reject({status: 500, message: 'Unable to find user.'});
                } else {
                    resolve(result[0]);
                }
            }));
        });
    },

    createUser: (options) => {
        return Promise.resolve([]);
        const query = `INSERT INTO userlist (
                name,
                hash,
                salt,
                role
            ) VALUES (
                ${mysql.escape(options.name)},
                ${mysql.escape(options.hash)},
                ${mysql.escape(options.salt)},
                ${mysql.escape(options.role)}
            )
            ON DUPLICATE KEY UPDATE \`name\` = \`name\`;`;

        return getConnection()
        .then (myDb => {
            log(6, 'modules/db/user:createUser - got db connection');
            return new Promise((resolve, reject) => myDb.query(`select * from userlist where name = ${mysql.escape(options.name)}`, (err, result) => {
                if (err) {
                    log(2, 'modules/db/user:createUser.1', err);
                    reject({status: 500, message: 'Failed checking if user exists'});
                } else {
                    if (result.length) {
                        reject({status: 400, message: 'User already exists.'})
                    } else {
                        log(6, 'modules/db/user:createUser - Username not used yet');
                        resolve();
                    }
                }
            }))
            .then(() => new Promise((resolve,reject) => {
                myDb.query(query, (err, result) => {
                    myDb.release();
                    if (err) {
                        log(2, 'modules/db/user:createUser.2', err, query);
                        reject({status: 500, message: 'Error creating user'});
                    } else {
                        log(6, 'modules/db/user:createUser - User created');
                        resolve({
                            user: {
                                name: options.name,
                                role: options.role,
                                id: result.insertId
                            },
                            success: true
                        });
                    }
                });
            }));
        })
        .catch(err => {
            if (err && err.status) {
                err.success = false;
                return err;
            }

            return error.db.codeError('modules/db/user.js:createUser.4', arguments);
        });
    },

    getAllUserSettings: () => {
        return Promise.resolve([]);
        return getConnection()
        .then (myDb => {
            const query = `
                SELECT
                    userlist.*,
                    userPlans.id        AS userPlanId,
                    userPlans.active    AS planActive,
                    userPlans.planId,
                    plans.imageUrl      AS planImageUrl,
                    plans.name          AS planName,
                    COALESCE(NULLIF(userPlans.note,''), plans.note) AS planNote
                FROM userlist
                LEFT JOIN userPlans
                ON userlist.id = userPlans.userId
                LEFT JOIN plans
                ON userPlans.planId = plans.id;`;

            return new Promise((resolve, reject) => myDb.query(query, (err, result) => {
                myDb.release();
                if (err) {
                    log(2, 'modules/db/user:getAllUserSettings', err);
                    reject({status: 500, message: 'Unable to get userlist.'});
                } else {
                    resolve(reduceUserPlansToArray(result));
                }
            }));
        });
    }
}
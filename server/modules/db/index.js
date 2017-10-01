const   mysql           = require('mysql')
    ,   log             = require(process.env.EVENT_HOME + 'modules/log');

let db = mysql.createPool({
  host     : process.env.EVENT_DB_HOST,
  port     : process.env.EVENT_DB_PORT,
  user     : process.env.EVENT_DB_USERNAME,
  password : process.env.EVENT_DB_PASSWORD,
  database : process.env.EVENT_DB_NAME
});

module.exports = () => new Promise((resolve, reject) => {
  db.getConnection((err, connection) => {
    if (err) {
      log(2, 'modules/db/index:1', err);
      reject();
    }
    resolve(connection);
  });
});
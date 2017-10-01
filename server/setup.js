#!/usr/bin/env node

const   mysql = require('mysql');

let myDb;

function initDb() {
    let db = mysql.createConnection({
          host     : process.env.EVENT_DB_HOST,
          port     : process.env.EVENT_DB_PORT,
          user     : process.env.ADMIN_DB_USERNAME,
          password : process.env.ADMIN_DB_PASSWORD
        });

    db.on('error', (err) => {
        if (err){
            if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                throw('MySQL-ConnectionError: ' + err);
            } else {
                myDb = initDb();
            }
        }
    });

    db.connect((err) => {
        if (err) {
            throw('MySQL-ConnectionError: ' + err);
        }
    });

    return db;
};

myDb = initDb();

let setup = [
    `CREATE OR REPLACE USER '${process.env.EVENT_DB_USERNAME}'@'${process.env.EVENT_DB_HOST}' IDENTIFIED BY '${process.env.EVENT_DB_PASSWORD}';`,
    `DROP DATABASE IF EXISTS ${process.env.EVENT_DB_NAME};`,
    `CREATE DATABASE IF NOT EXISTS ${process.env.EVENT_DB_NAME};`,
    `GRANT ALL PRIVILEGES ON ${process.env.EVENT_DB_NAME}.* TO '${process.env.EVENT_DB_USERNAME}'@'${process.env.EVENT_DB_HOST}';`,
    `USE ${process.env.EVENT_DB_NAME};`,

    `CREATE TABLE IF NOT EXISTS \`userlist\` (
        \`id\`      int             NOT NULL    AUTO_INCREMENT,
        \`name\`    varchar(150)    NOT NULL,
        \`hash\`    varchar(150)    NOT NULL,
        \`salt\`    varchar(150)    NOT NULL,
        \`role\`    varchar(150)    NOT NULL,

        PRIMARY KEY (id),
        UNIQUE KEY \`name\` (\`name\`)
    );`
];

function setupDB() {
    myDb.query(setup[0], (err) => {
        if (err) {
            console.log(err);
            console.log(setup[0]);
            process.exit(1);
        } else {
            setup = setup.slice(1);
            if (setup.length) {
                setupDB();
            } else {
                console.log('Completed sucessfully.')
                process.exit();
            }
        }

    });
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log(
`--------------------------------------------------
|           Setup Trainingsplan Server           |
--------------------------------------------------
|                                                |
|      Warnung: Sollten bereits Daten in der     |
|       Datenbank existieren, werden diese       |
|     durch die Installation gelöscht werden     |
|                                                |
--------------------------------------------------
|  Bitte bestätigen Sie den Installationswunsch  |
--------------------------------------------------
(y/n): `.replace(/:\n/, ':'));

process.stdin.on('data', function (text) {
    if (text === 'y\n') {
        setupDB();
    } else if (text === 'n\n') {
        process.exit()
    } else {
        console.log(
`--------------------------------------------------
|  Ungültige Eingabe, bitte bestätigen Sie den   |
|              Installationswunsch               |
--------------------------------------------------
(y/n): `.replace(/:\n/, ':')
        );
    }
});

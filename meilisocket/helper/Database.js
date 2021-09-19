const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('meiliadmin.db');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS meili_servers(id INTEGER PRIMARY KEY AUTOINCREMENT, server_name VARCHAR(255), server_ip VARCHAR(255), protocol VARCHAR(10), port INTEGER,  created_at DATE DEFAULT (datetime('now','localtime')))");
});


module.exports = {

    async getServerList() {

        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM meili_servers", (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        })
    },

    async addNewServer(server_name, server_ip, port, protocol) {
        return new Promise((resolve, reject) => {
            const statement = db.prepare("INSERT INTO meili_servers(server_name, server_ip, port, protocol) VALUES (?, ?, ?, ?)");
            statement.run(server_name, server_ip, port, protocol)
            statement.finalize();
            resolve(true)
        })

    }

}
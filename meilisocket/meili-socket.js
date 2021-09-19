const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const API = require("./helper/MeiliAPI");
const DB = require("./helper/Database");
const Logger = require("./helper/Logger");


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    allowEIO3: true,
    transport: ['websocket']
});
(async () => {

    let MeiliServers = await DB.getServerList();

    io.on('connection', (socket) => {

        Logger.Success("[MeiliAdmin] User Connected");

        socket.on("health", async () => {
            for (let ServerData of MeiliServers) {
                socket.emit("health", {
                    serverId: ServerData.id,
                    serverName: ServerData.server_name,
                    ip: ServerData.server_ip,
                    protocol: ServerData.protocol,
                    port: ServerData.port,
                    created_at: ServerData.created_at,
                    status: await API.checkHealth(ServerData.server_ip, ServerData.protocol, ServerData.port),
                    data: await API.checkStats(ServerData.server_ip, ServerData.protocol, ServerData.port)
                });
            }
        })

        socket.on("server_indexes", async (id) => {
            const findServer = MeiliServers.find(M => M.id == id);
            if (!findServer) return
            const indexList = await API.getIndexList(findServer.server_ip, findServer.protocol, findServer.port);
            socket.emit("server_indexes", indexList);
        });

        socket.on("index_settings", async (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            const indexList = await API.getIndexSettings(findServer.server_ip, findServer.protocol, findServer.port, index);
            socket.emit("index_settings", indexList);
        });

        socket.on("add_server", async (server_name, server_ip, port, protocol) => {
            await DB.addNewServer(server_name, server_ip, port, protocol)
            MeiliServers = await DB.getServerList();
        })

        socket.on("updateDisplayAttr", (server_id, index, attr) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.setDisplayAttr(findServer.server_ip, findServer.protocol, findServer.port, index, attr);
        })

        socket.on("updateSearchAttr", (server_id, index, attr) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.setSearchAttr(findServer.server_ip, findServer.protocol, findServer.port, index, attr);
        })

        socket.on("updateFilterAttr", (server_id, index, attr) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.setFilterAttr(findServer.server_ip, findServer.protocol, findServer.port, index, attr);
        })

        socket.on("updateRankingAttr", (server_id, index, attr) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.setRankingAttr(findServer.server_ip, findServer.protocol, findServer.port, index, attr);
        })

        socket.on("updateStopWordsAttr", (server_id, index, attr) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.setStopWordsAttr(findServer.server_ip, findServer.protocol, findServer.port, index, attr);
        })

        socket.on("updateDistinct", (server_id, index, attr) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.updateDistinct(findServer.server_ip, findServer.protocol, findServer.port, index, attr);
        })

        socket.on("resetDisplayAttr", (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.resetDisplayAttr(findServer.server_ip, findServer.protocol, findServer.port, index);
        })

        socket.on("resetSearchAttr", (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.resetSearchAttr(findServer.server_ip, findServer.protocol, findServer.port, index);
        })

        socket.on("resetFilterAttr", (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.resetFilterAttr(findServer.server_ip, findServer.protocol, findServer.port, index);
        })

        socket.on("resetRankingAttr", (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.resetRankingAttr(findServer.server_ip, findServer.protocol, findServer.port, index);
        })

        socket.on("resetStopWordsAttr", (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.resetStopWordsAttr(findServer.server_ip, findServer.protocol, findServer.port, index);
        })

        socket.on("updateSynonyms", (server_id, index, attr) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.updateSynonyms(findServer.server_ip, findServer.protocol, findServer.port, index, attr);
        })

        socket.on("resetSynonyms", (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.resetSynonyms(findServer.server_ip, findServer.protocol, findServer.port, index);
        })

        socket.on("resetDistinct", (server_id, index) => {
            const findServer = MeiliServers.find(M => M.id == server_id);
            if (!findServer) return
            API.resetDistinct(findServer.server_ip, findServer.protocol, findServer.port, index);
        })


    });

    server.listen(9191, () => {
        Logger.Success("[MeiliAdmin] Socket Started At *:9191");
    });

})();
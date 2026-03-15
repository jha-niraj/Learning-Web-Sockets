"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
app.use(express_1.default.json());
const rooms = new Map();
// Web Socket related code:
wss.on("connection", function connection(socket) {
    console.log("User connected with the socket: " + socket);
    socket.on("error", console.error);
    let currentRoom = null;
    socket.on("message", (e) => {
        const data = JSON.parse(e.toString());
        if (data.type === 'join_room') {
            if (!data.roomId) {
                socket.send(JSON.stringify({
                    type: 'error',
                    message: "Please send the room id!!!"
                }));
                return;
            }
            const room = rooms.get(data.roomId);
            if (!room) {
                socket.send(JSON.stringify({
                    type: 'error',
                    message: "Room doesn't exist!!!"
                }));
                return;
            }
            room.sockets.add(socket);
            currentRoom = data.roomId;
            socket.send(JSON.stringify({
                type: 'success',
                message: "Added to the room!!!"
            }));
        }
        else if (data.type === 'chat') {
            if (!currentRoom)
                return;
            const room = rooms.get(currentRoom);
            if (!room) {
                socket.send(JSON.stringify({
                    type: 'error',
                    message: "Room doesn't exist!!!"
                }));
                return;
            }
            room.sockets.forEach(client => {
                if (client != socket && client.readyState != ws_1.CLOSED) {
                    client.send(JSON.stringify({
                        type: "chat",
                        message: data.message,
                        userId: data.userId
                    }));
                }
            });
        }
    });
    socket.on("close", () => {
        if (currentRoom) {
            const room = rooms.get(currentRoom);
            if (room) {
                room.sockets.delete(socket);
                if (room.sockets.size === 0) {
                    rooms.delete(currentRoom);
                }
            }
        }
    });
});
// Express Server Related code:
app.post("/createroom", (req, res) => {
    const { name } = req.body;
    try {
        const roomId = crypto.randomUUID();
        const userId = name + crypto.randomUUID();
        if (!roomId) {
            res.send({
                success: false
            });
        }
        rooms.set(roomId, {
            sockets: new Set(),
            owner: userId
        });
        res.send({
            success: true,
            roomId: roomId,
            userId: userId
        });
    }
    catch (err) {
        console.log("Error Occurred while getting room Id: " + err);
    }
});
app.post("/checkroom", (req, res) => {
    const { roomId } = req.body;
    try {
        const isRoomExists = rooms.get(roomId);
        if (!isRoomExists) {
            res.json({
                success: false,
                message: "Room doesn't exist, please create a new room!!!"
            });
        }
        res.json({
            success: true,
            message: "Room exist. Redirecting you to the room now!!!"
        });
    }
    catch (err) {
        console.log("Error occurred while checking room: " + err);
    }
});
server.listen(8080, () => {
    console.log("Listening on port: 8080");
});

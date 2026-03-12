import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(socket) {

    console.log("User connected with the socket: " + socket);
    socket.on("error", console.error);

    socket.send("Hey, I am Niraj Jha");

    // socket.on("message", (e) => {
    //     try {
    //         const msg = JSON.parse(e.toString());

    //         console.log(msg.name);

    //         socket.send("Hey");
    //     } catch (err) {
    //         socket.send("Please send the valid JSON");
    //     }

    //     // setInterval(() => {
    //     //     socket.send("Current price of solana is: " + Math.random() * 2);
    //     // }, (500));
    // })

    socket.on("message", (e) => {
        console.log("Sending the same message back to the user: " + e.toString());
        socket.send("Hey, How can I help you?");
    })
})
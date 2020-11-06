const SocketIoServer = require("socket.io").Server;

const io = new SocketIoServer();

const PORT = 3000;

io.on('connection', (socket_client) => {
    console.log('Client connected', socket_client.id);
    
    socket_client.on('send_message', (data) => {
        const { message } = data;
        const package_msg = {
            message,
            date: + new Date(),
            client: socket_client.id
        };
        console.log("Receive: ", package_msg);
        //io.emit('announce', "Nouveau message!"); // for every client
        socket_client.broadcast.emit('new_message', package_msg);
    });
})

io.listen(PORT);
console.log("\nListen on port: " + PORT + "\n");

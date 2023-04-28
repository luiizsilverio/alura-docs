import io from "./server.js";

io.on("connection", (socket) => {
    console.log('cliente se conectou! ID:', socket.id);

    socket.on("send_text", (texto) => {
        /*
        // envia o texto recebido p/ todos os clientes
        io.emit("send_text_clients", texto); 
        */

        // envia o texto recebido p/ todos os clientes, menos p/ si mesmo
        socket.broadcast.emit("send_text_clients", texto);
    })

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado! Motivo: ${motivo}`);
    });

})

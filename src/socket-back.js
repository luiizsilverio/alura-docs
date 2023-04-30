import io from "./server.js";

const documentos = [
    {
        nome: "Javascript",
        texto: "texto de javascript..."
    },
    {
        nome: "Node",
        texto: "texto de Node..."
    },
    {
        nome: "Socket.io",
        texto: "texto de Socket.io..."
    },
]

io.on("connection", (socket) => {
    console.log('cliente se conectou! ID:', socket.id);

    socket.on("selecionar_documento", (nomeDoc) => {
        socket.join(nomeDoc);
    })

    socket.on("send_text", ({ texto, nomeDoc }) => {
        // io.emit("send_text_clients", texto); // envia o texto recebido p/ todos os clientes

        // envia o texto recebido p/ todos os clientes, menos p/ si mesmo
        // socket.broadcast.emit("send_text_clients", texto);

        // envia o texto recebido p/ todos os clientes  de uma determinada sala (nomeDoc), menos p/ si mesmo
        socket.to(nomeDoc).emit("send_text_clients", texto);
    })

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado! Motivo: ${motivo}`);
    });

})

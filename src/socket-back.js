import io from "./server.js";

const documentos = [
    {
        nome: "JavaScript",
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

    socket.on("selecionar_documento", (nomeDoc, callback) => {
        socket.join(nomeDoc);

        const documento = encontrarDocumento(nomeDoc);
        
        if (documento) {
            callback(documento.texto);
        }
    })

    socket.on("send_text", ({ texto, nomeDoc }) => {
        const documento = encontrarDocumento(nomeDoc);

        if (documento) {
            documento.texto = texto;
            // envia o texto recebido p/ todos os clientes  de uma determinada sala (nomeDoc), menos p/ si mesmo
            socket.to(nomeDoc).emit("send_text_clients", texto);
        }
    })

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado! Motivo: ${motivo}`);
    });

})

function encontrarDocumento(nome) {
    const documento = documentos.find(doc => doc.nome === nome);
    return documento;
}
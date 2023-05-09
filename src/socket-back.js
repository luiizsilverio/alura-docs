import io from "./server.js";
import { atualizaDocumento, encontrarDocumento } from "./documentosDb.js";

io.on("connection", (socket) => {
    console.log('cliente se conectou! ID:', socket.id);

    socket.on("selecionar_documento", async (nomeDoc, callback) => {
        socket.join(nomeDoc);

        const documento = await encontrarDocumento(nomeDoc);
        
        if (documento) {
            callback(documento.texto);
        }
    })

    socket.on("send_text", async ({ texto, nomeDoc }) => {
        const atualizacao = await atualizaDocumento(nomeDoc, texto);
        
        // envia o texto recebido p/ todos os clientes  de uma determinada sala (nomeDoc), menos p/ si mesmo
        if (atualizacao.modifiedCount) {
            socket.to(nomeDoc).emit("send_text_clients", texto);
        }
    })

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado! Motivo: ${motivo}`);
    });

})

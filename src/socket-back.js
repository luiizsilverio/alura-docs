import io from "./server.js";

import { 
    adicionarDocumento, 
    atualizaDocumento, 
    encontrarDocumento, 
    excluirDocumento, 
    obterDocumentos 
} from "./documentosDb.js";

io.on("connection", (socket) => {
    console.log('cliente se conectou! ID:', socket.id);

    socket.on("obter_documentos", async (callback) => {
        const documentos = await obterDocumentos();
        callback(documentos);
    })

    socket.on("adicionar_documento", async (nomeDoc) => {
        const documentoExiste = (await encontrarDocumento(nomeDoc)) !== null;

        if (documentoExiste) {
            socket.emit("documento_existe", nomeDoc);
        } else {
            const resultado = await adicionarDocumento(nomeDoc);
            
            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nomeDoc);
            }
        }
    })

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

    socket.on("excluir_documento", async (nomeDoc) => {
        const resultado = await excluirDocumento(nomeDoc);

        if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nomeDoc);
        }
    })
})

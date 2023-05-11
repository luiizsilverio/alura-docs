import { atualizaTextoEditor, alertarERedirecionar } from "./documento.js";

const socket = io();		

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizaTextoEditor(texto);
    });
}

function enviarTexto(dados) {
    socket.emit('send_text', dados);
}

socket.on("send_text_clients", (texto) => {
    atualizaTextoEditor(texto);
})

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado! Motivo: ${motivo}`);
});

function emitirExcluirDocumento(nome) {
    socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
    alertarERedirecionar(nome);
})

export { enviarTexto, selecionarDocumento, emitirExcluirDocumento };
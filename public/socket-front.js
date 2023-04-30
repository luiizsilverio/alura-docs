import { atualizaTextoEditor } from "./documento.js";

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

export { enviarTexto, selecionarDocumento };
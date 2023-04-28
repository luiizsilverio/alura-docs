import { atualizaTextoEditor } from "./documento.js";

const socket = io();		

function enviarTexto(texto) {
    socket.emit('send_text', texto);
}

socket.on("send_text_clients", (texto) => {
    atualizaTextoEditor(texto);
})

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado! Motivo: ${motivo}`);
});

export { enviarTexto };
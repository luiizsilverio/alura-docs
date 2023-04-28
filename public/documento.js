import { enviarTexto } from "./socket-front.js";

const editorTexto = document.querySelector("textarea#editor-texto");

editorTexto.addEventListener("keyup", () => {   
    enviarTexto(editorTexto.value);
})

function atualizaTextoEditor(texto) {
    editorTexto.value = texto;
}

export { atualizaTextoEditor }
import { enviarTexto, selecionarDocumento } from "./socket-front.js";

const param = new URLSearchParams(window.location.search);
const nomeDoc = param.get("nome") || "Documento sem título";

const tituloEl = document.getElementById("titulo-documento");
const editorTexto = document.querySelector("textarea#editor-texto");

tituloEl.textContent = nomeDoc;

selecionarDocumento(nomeDoc);

editorTexto.addEventListener("keyup", () => {   
    enviarTexto({
        texto: editorTexto.value, 
        nomeDoc
    });
})

function atualizaTextoEditor(texto) {
    editorTexto.value = texto;
}

export { atualizaTextoEditor }
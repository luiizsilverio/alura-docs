import { enviarTexto, selecionarDocumento, emitirExcluirDocumento } from "./socket-front.js";

const param = new URLSearchParams(window.location.search);
const nomeDoc = param.get("nome") || "Documento sem título";

const tituloEl = document.getElementById("titulo-documento");
const editorTexto = document.querySelector("textarea#editor-texto");
const btnExcluir = document.getElementById("excluir-documento");

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

btnExcluir.addEventListener("click", (e) => {
    emitirExcluirDocumento(nomeDoc);
})

function alertarERedirecionar(nome) {
    if (nome === nomeDoc) {
        alert(`Documento ${nome} excluído!`);
        window.location.href = "/";
    }
}

export { atualizaTextoEditor, alertarERedirecionar }
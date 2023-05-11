import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDoc = document.getElementById("input-documento");


function inserirLinkDocumento(nomeDoc) {
    listaDocumentos.innerHTML += `
        <a 
            href="documento.html?nome=${nomeDoc}" 
            class="list-group-item list-group-item-action"
            id="doc-${nomeDoc}"
        >
            ${nomeDoc}
        </a>
    `;
}

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    emitirAdicionarDocumento(inputDoc.value);
    inputDoc.value = "";
})

function removerLinkDocumento(nomeDoc) {
    const documento = document.getElementById(`doc-${nomeDoc}`);
    listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento }
import { documentosCollection } from "./dbConnect.js";

function encontrarDocumento(nome) {
    const documento = documentosCollection.findOne({ nome });
    return documento;
}

function atualizaDocumento(nomeDoc, texto) {
    const atualizacao = documentosCollection.updateOne({
        nome: nomeDoc,        
    }, {
        $set: {
            texto
        }
    })

    return atualizacao;
}

function obterDocumentos() {
    const documentos = documentosCollection.find().toArray();
    return documentos;
}

function adicionarDocumento(nomeDoc) {
    const resultado = documentosCollection.insertOne({
        nome: nomeDoc,
        texto: ""
    })
    return resultado;
}

function excluirDocumento(nomeDoc) {
    const resultado = documentosCollection.deleteOne({
        nome: nomeDoc
    })
    return resultado;
}

export { 
    encontrarDocumento, 
    atualizaDocumento, 
    obterDocumentos, 
    adicionarDocumento, 
    excluirDocumento 
};

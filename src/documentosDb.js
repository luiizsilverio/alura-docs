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

export { encontrarDocumento, atualizaDocumento };

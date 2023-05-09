import { MongoClient } from "mongodb";

const { DB_NAME, DB_USER, DB_PASS } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.jnijzrd.mongodb.net/?retryWrites=true&w=majority`;

const dbClient = new MongoClient(url);

let documentosCollection;

try {
    await dbClient.connect();

    const db = dbClient.db(DB_NAME);
    documentosCollection = db.collection("documentos");

    console.log("Conectado ao banco de dados.")


} catch (erro) {
    console.log(erro);
}

export { documentosCollection };

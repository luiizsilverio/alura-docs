import express from "express";
import http from "http";
import { Server } from "socket.io";
// import url from "url";
// import path from "path";

const app = express();
const porta = process.env.porta || 3000;

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(__dirname));

app.use(express.static('public')) 

const httpServer = http.createServer(app);

httpServer.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));

const io = new Server(httpServer);

export default io;

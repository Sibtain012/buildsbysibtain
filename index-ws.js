import http from 'http';
import express from 'express'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer();
app.get("/", (req,res) => {
    res.sendFile("index.html", {root: __dirname});
});

server.on("request", app);
server.listen(3000, ()=> {
    console.log("Server Running on PORT: 3000");

})

// Web Socket Start


import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    const clientNums = wss.clients.size;
    console.log("Clients Connected: ", clientNums);

    wss.broadcast(`Current Visitors: ${clientNums}`);

    if( ws.readyState === ws.OPEN){
        ws.send("Welcome to my server");
    }

    ws.on("close", () => {
        wss.broadcast("Clients Connected: ", clientNums);
        console.log("Client Disconnected");
    })
})

wss.broadcast = function broadcast(data){
wss.clients.forEach(function each(client){
client.send(data);  
})
}
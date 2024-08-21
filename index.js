const http = require('http');
const app = require('./app');
const server = http.createServer(app);
var port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log("servere on 3000");
});
// =======文件控制

var port = 83;
var http = require("http");
var url  = require("url");
var fs   = require("fs");

var server = http.createServer(function(request,response){
    var pathname = url.parse(request.url).pathname;
    if(pathname === '/public/index.html' || pathname === '/style.css' || pathname === '/main.js' || pathname === '/public/bundle.js'){
        //fs.readFile('/index.html');
        //fs.readFile('index.html');
        fs.readFile(__dirname + pathname,'binary',function(err,file){
            if(err){
                response.write("404");
                response.end();
            }else{
                response.writeHead(200,{
                    'Content-Type': pathname === '/public/index.html' ? 'text/html' : pathname === '/style.css' ? 'text/css' :  'text/js'
                });
                response.write(file,"binary");
                response.end();
            }
        });
    }else{
        response.write("404");
        response.end();
    }
});

//server.listen(port,'127.0.0.1');
server.listen(port);

// =======文件控制


var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 8083 });
var log = console.log.bind(console);
var serverInfo = {
    x:null,
    y:null,
    z:null
};

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        log("====接受来自前台的数据====");
        var json = JSON.parse(message); // 客户端传来的数据
        // for(var i = 0;i <= 360;i++){
        //     serverInfo.x++;
        //     serverInfo.y++;
        //     serverInfo.z++;
        // }
        serverInfo.x = json.x;
        serverInfo.y = json.y;
        serverInfo.z = json.z;
        wss.broadcast(JSON.stringify(serverInfo));
    });
});
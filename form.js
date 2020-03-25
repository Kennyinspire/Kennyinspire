var http = require('http');
var qs = require('querystring');
var fs = require('fs');

var server = http.createServer(function (req, res){
    console.log(req, res);
    if (req.method ==="GET") {
        res.writeHead(200, { "Content-Type": "text/html"});
        fs.createReadStream("./form.html", "UTF-8").pipe(res);

    } else if (req.method === "POST") {
        var body = "";
        req.on("data", function(chunk){
            body += chunk;

            console.log(body);
        });

        req.on("end", function(){
            var post = qs.parse(body);
            res.writeHead(200, { "Content-Type": "text/html"});
            fs.appendFile("message.txt", post.message, function(err){
                if (err) throw err;
            })
            res.end();
        })
    }
});
server.listen(3000, () => console.log("Server Running . . ."));
import http from "node:http";

const port = 3000;

const server = http.createServer((req, res) => {
    const response = {
        message: "Vamos vamos meu verdão vamos nao para de lutar",
        version: "1.0.0",
        xpto: "abcdefghijklmnopqrstuv"
    };

    res.writeHead(200, {
        "content-type": "application/json"
    });

    res.end(JSON.stringify(response));
});

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});




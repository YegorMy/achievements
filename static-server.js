const static = require('node-static');
const file = new static.Server('./public');

module.exports.spawnServer = (port) => {
    return new Promise(resolve => {
        const server = require('http').createServer(function (request, response) {
            request.addListener('end', function () {
                file.serve(request, response);
            }).resume();
        }).listen(port, () => {
            resolve(server);
        });
    });
};

module.exports.killServer = (server) => {
    server.close();
}
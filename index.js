const fs = require('fs');
const listFile = __dirname + '/list.txt';
const parser = require('./lib/parser');
const pageGenerator = require('./lib/page-generator');
const folderManager = require('./lib/folder-manager');
const spawn = require('child_process').spawn;
const promiseFuncs = require('./lib/promise-funcs');
const staticServer = require('./static-server');
const config = require('./config/config.json');
let staticServerInstance;

staticServer.spawnServer(config.port).then((serverInstance) => {
    staticServerInstance = serverInstance;

    return folderManager.create();
})
.then(() => promiseFuncs.readFile(listFile))
.then(buffer => parser(buffer))
.then(data => Promise.all(data.map(e => pageGenerator(e))))
.then(names => promiseFuncs.writeFile('./data/names.json', JSON.stringify(names)))
.then(() => promiseFuncs.execAndOnClose('./node_modules/.bin/phantomjs', ['lib/phantom.js']))
.then(() => {
    staticServer.killServer(staticServerInstance);
    console.log('Achievements generated!');

    if (config.removeFolders) {
        return folderManager.remove();
    }
    
    return;
}).catch(e => {
    console.log(e);
});
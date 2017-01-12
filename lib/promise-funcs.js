const fs = require('fs');
const spawn = require('child_process').spawn;
const rmrf = require('rimraf');

function createIfExists (folder) {
    return existsPromise(folder).then(exists => {
        if (exists) {
            return true;
        }
        
        return mkdirPromise(folder);
    });
}

function existsPromise (folder) {
    return new Promise(resolve => {
        fs.exists(folder, resolve);
    });
}

function mkdirPromise (folder) {
    return new Promise((resolve, reject) => {
        fs.mkdir(folder, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        })
    })
}

module.exports.readFile = filename => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, buffer) => {
            if (err) {
                reject(err);
            }

            resolve(buffer);
        });
    });
}

module.exports.writeFile = (filename, contents) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, contents, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}

module.exports.execAndOnClose = (processName, args) => {
    return new Promise(resolve => {
        const process = spawn(processName, args);

        process.on('close', () => {
            resolve();
        })
    });
}

module.exports.rmrf = (folder) => {
    return new Promise((resolve, reject) => {
        rmrf(folder, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}


module.exports.createIfExists = createIfExists;
module.exports.existsPromise = existsPromise;
module.exports.mkdirPromise = mkdirPromise;
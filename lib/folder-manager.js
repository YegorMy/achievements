const fs = require('fs');
const folderlist = ['achievements', 'data', 'public/pages'];
const supportiveFolderList = ['data', 'public/pages'];
const promiseFuncs = require('./promise-funcs');

module.exports.create = () => {
    return Promise.all(folderlist.map(e => promiseFuncs.createIfExists(e)));
}

module.exports.remove = () => {
    return Promise.all(supportiveFolderList.map(e => promiseFuncs.rmrf(e)));
}
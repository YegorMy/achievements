const fs = require('fs');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = (contents) => {
    return new Promise((resolve, reject) => {
        return resolve(contents.toString().split('\n').map(e => {
            const contents = e.split(' -- ');
            const achieve = {};
            const achieveName = capitalizeFirstLetter(contents[0].trim());
            
            let quote = capitalizeFirstLetter(contents[1].trim());
            let achieveDescr = capitalizeFirstLetter((contents[2] || '').trim());
            
            if (!achieveDescr) {
                achieveDescr = quote;
                quote = null;
            }

            achieve.name = achieveName;
            achieve.description = achieveDescr;

            if (quote) {
                achieve.quote = quote;
            }

            return achieve;
        }));
    });
}

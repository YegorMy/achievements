const fs = require('fs');
const data = require('../data/names.json');
const config = require('../config/config.json');
var pageCount = 0;

data.forEach(function (e) {
    const page = require('webpage').create();
    
    page.open('http://127.0.0.1:' + config.port + '/pages/' + e + '.html', function(status) {
        setTimeout(function() {
            if(status === "success") {
                page.render('achievements/' + e + '.png');
                pageCount++;

                if (pageCount === data.length - 1) {
                    phantom.exit();
                }
            }
        }, 2000);
    });
    page.onResourceError = function(resourceError) {
        console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
        console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    };
});

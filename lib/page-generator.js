const fs = require('fs');
const names = [];
const alphabet = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

function createHtmlFile (element) {
    return new Promise((resolve) => {
        fs.readFile('./templates/index.html', function (err, buffer) {
            if (err) {
                throw new Error(err);
            }
            const contents = buffer.toString();
            const data = {
                extraHtmlClass: '',
                name: element.name,
                quote: '',
                description: element.description
            };
            const name = generateName(data.name);

            if (element.name.split(' ').length > 1 || element.name.length >= 9) {
                data.extraHtmlClass = ' achieve__heading-text--small';
            }

            if (element.name.split(' ').length === 1 && element.name.length >= 14) {
                data.extraHtmlClass = ' achieve__heading-text--super-small';
            }

            if (element.quote) {
                data.quote = `&laquo;${element.quote}&raquo;`
            }

            fs.writeFile(`public/pages/${name}.html`, template(contents, data), () => {
                resolve(name);
            });
        });
    });
}

function template (template, data) {
    for (const key in data) {
        const templateKey = '{{' + key + '}}';
        template = template.replace(templateKey, data[key]);
    }

    return template;
}

function transliterate(word){
  return word.split('').map(function (char) { 
    return alphabet[char] || char; 
  }).join("");
}

function generateName (name) {
    return transliterate(name.toLowerCase()).replace(/[\s,'\?\.]/g, '')
}

module.exports = createHtmlFile;

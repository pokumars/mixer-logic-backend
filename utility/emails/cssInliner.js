var fs = require('fs');
var juice = require('juice');

var source = fs.readFileSync('./utility/emails/testEmail.html', 'utf-8');
var inlinecss = juice(source, { removeStyleTags: true, preserveMediaQueries: true });

console.log(inlinecss);
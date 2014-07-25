// to build a tweet object

var schema = require('./schema.js')


module.exports = function(callback) {

    var template = (schema.name, schema.columns)
    return callback(null, template);
}


if(process.argv[1] === __filename) {
  console.log(template);
}




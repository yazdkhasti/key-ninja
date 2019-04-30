
var config = {
    development: {
        auth: {
            tokenKey: "8A{]}j5GTp9Pyuu~"
        },
        db: {
         url:"mongodb+srv://keyninja:p2cQwyUQp097qg6D@cluster0-lmnjl.azure.mongodb.net/test?retryWrites=true"
        }

    },
    production: {
        auth: {
            tokenKey: "8A{]}j5GTp9Pyuu~"
        },
        db: {
        url:"mongodb+srv://keyninja:p2cQwyUQp097qg6D@cluster0-lmnjl.azure.mongodb.net/test?retryWrites=true"
        }
    }
}

var env = process.env.NODE_ENV || 'development';

module.exports = config[env];
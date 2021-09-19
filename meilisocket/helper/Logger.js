const chalk = require('chalk');

module.exports = {
    Error(text) {
        console.log(chalk.black.bgRed(text));
    },

    Success(text) {
        console.log(chalk.black.bgGreen(text));
    }

}
const path = require('path');

//-- Include scripts
const scripts = [
    "./node_modules\\jquery\\dist\\jquery.min.js"
];

//-- Include styles
const styles = [
    "./src\\assets\\fonts\\loader.css",
    "./src\\styles.scss",
    "./node_modules\\tether\\dist\\css\\tether.min.css",
    "./node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"
];

//-- Export module
module.exports = {
    scripts: scripts.map((value) => 'script-loader!' + value),
    styles: styles,
    ejects: styles.map((value) => path.join(process.cwd(),  value.slice(2, value.length)))
};
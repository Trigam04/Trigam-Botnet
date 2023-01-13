const funcs = require('./funcs.js');
const replaceAsync = require("string-replace-async");
module.exports = execute;

// Variables
var devSteps = [];

// Execute the substitution whenever there's changes to be made 
async function execute(input, args = {}, config = {}, bot, Discord, interaction) {
    // Set up some config and variables
    var loopLimit = config.loopLimit || 500;
    var previous = "", code = input;
    // Run the substitution until there's no more changes to be made
    // (or until the loop limit is reached)
    while (previous !== code && loopLimit--) {
        // If dev mode is enabled, add the current code to the dev steps
        if (config.devMode) devSteps.push(code);
        previous = code;
        code = await substitute(code);
    };
    // If dev mode is enabled, return the steps of execution rather than the result
    // (steps include the result so it's not necessary to return both)
    if (config.devMode) return devSteps.join('\n');
    return code;
};

// Find every bracketed expression and substitute it with the result
async function substitute(inputCode) {
    return await replaceAsync(inputCode, /{[^{]+?}/g, async substring => {
        // Crack open the brackets to get the expression from inside
        substring = substring.slice(1, -1).split("|");
        // Evaluate the expression (or just return the expression if it's not valid)
        if (funcs[substring[0]]) return await funcs[substring[0]](...substring.slice(1));
        else return gvars[substring[0]] || `{${substring.join('|')}}`;
    });
};

// All of the predefined variables
const gvars = {
    '#': '',
    '//': '',
    '\\n': '\n',
};
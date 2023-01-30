const Bracketeer = require('./funcs.js');
const replaceAsync = require("string-replace-async");
module.exports = execute;

// Variables
var devSteps = [];

// Execute the substitution whenever there's changes to be made 
async function execute(input, argsArr = [], config = {}, bot, Discord, interaction) {
    const bracketeer = new Bracketeer(argsArr, bot, Discord, interaction);
    devSteps = [];
    var loopLimit = config.loopLimit || 500;
    var previous = "", code = input;
    // Run the substitution until there's no more changes to be made (or until the loop limit is reached)
    while (previous !== code && loopLimit--) {
        if (config.devMode) devSteps.push(code);
        previous = code;
        code = await substitute(code, bracketeer);
    };
    let options = {ephemeral: bracketeer.ephemeral};
    // If dev mode is enabled, return the steps of execution rather than the result
    // (steps include the result so it's not necessary to return both)
    if (config.devMode) return [devSteps.join('\n'), options];
    return [code, options];
};

// Find every bracketed expression and substitute it with the result
async function substitute(inputCode, bracketeer) {
    return await replaceAsync(inputCode, /{[^{]+?}/g, async substring => {
        substring = substring.slice(1, -1).split("|");
        if (typeof await bracketeer[substring[0]] == 'function') var result = await bracketeer[substring[0]](...substring.slice(1));
        if (result != undefined) return result;
        else if (substring[0] == '__proto__') return "Invalid variable name!";
        else if (gvars[substring[0]]) return gvars[substring[0]];
        else if (bracketeer.vars[substring[0]]) return bracketeer.vars[substring[0]];
        else return `{${substring.join('|')}}`;
    });
};

// All of the predefined variables
const gvars = {
    '#': '',
    '//': '',
    '\\n': '\n',
};
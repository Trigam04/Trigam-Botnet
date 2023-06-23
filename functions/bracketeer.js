const Response = require('./funcs.js');
const replaceAsync = require("string-replace-async");

var devSteps = [];

module.exports = execute;

// Execute the substitution whenever there's changes to be made 
async function execute(input, argsArr = [], config = {}, bot, Discord, interaction) {
    input = input.replace(/{/g, '❴').replace(/}/g, '❵');
    const response = new Response(argsArr, bot, Discord, interaction);
    devSteps = [];
    var loopLimit = config.loopLimit || 500;
    var previous = "", code = input;
    // Run the substitution until there's no more changes to be made (or until the loop limit is reached)
    while (previous !== code && loopLimit--) {
        if (config.devMode) devSteps.push(code);
        previous = code;
        code = await substitute(code, response);
    };
    let options = {ephemeral: response.ephemeral, embed: response.emb};
    // If dev mode is enabled, return the steps of execution rather than the result
    // (steps include the result so it's not necessary to return both)
    if (config.devMode) return [devSteps.join('\n'), options];
    return [code.replace(/❴/g, '{').replace(/❵/g, '}'), options];
};

// Find every bracketed expression and substitute it with the result
async function substitute(inputCode, funcs) {
    return await replaceAsync(inputCode, /❴[^❴]+?❵/g, async substring => {
        // Slice up args
        substring = substring.slice(1, -1).split("|");
        // Prevent wacky hijinks
        for (let substr of substring) { if ([new Array()][substr] !== undefined && substr !== '0') return `{${substring.join('|')}}` };
        // If the first arg is a function, run it and return result
        if (typeof await funcs[substring[0]] == 'function') var result = await funcs[substring[0]](...substring.slice(1));
        if (result !== undefined) return result;
        // If the first arg is a variable, return the variable
        if (funcs.vars[substring[0]]) return varProps(funcs.vars[substring[0]], substring.slice(1));
        else if (gvars[substring[0]] !== undefined) return gvars[substring[0]];
        else return `❴${substring.join('|')}❵`;
    });
};

// All of the predefined variables
const gvars = {
    '#': '',
    '//': '',
    '\\n': '\n',
};

function varProps(variable, props) {
    var result = variable;
    for (var i = 0; i < props.length; i++) result = result.replace(new RegExp(`%${i + 1}`, 'g'), props[i]);
    return result;
}
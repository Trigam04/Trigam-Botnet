const functions = {
    // Vars
    collectFilter: (m) => m.author.id === interaction.author.id,
    // Functions
    nthify: (num, exclude) => {
        switch (Math.abs(Number(num)) % 10) {
            case 1: return exclude ? "st" : num + "st";
            case 2: return exclude ? "nd" : num + "nd";
            case 3: return exclude ? "rd" : num + "rd";
            default: return exclude ? "th" : num + "th";
        }; 
	},
    validURL: (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    },
    progress: (currentVal, rangeMax, maxBarVal, emptyStr, fullStr, thumbStr) => { 
        let num = Math.round(functions.convertRange(currentVal, [0, rangeMax], [0, maxBarVal]));
        let diff = maxBarVal - num;
        var str = `${functions.repeat(fullStr, num - 1)}${num == 0 ? '' : thumbStr}${functions.repeat(emptyStr, diff)}`;
        return str;
    },
    convertRange: (value, r1, r2) => { return ( value - r1[0] ) * ( r2[1] - r2[0] ) / ( r1[1] - r1[0] ) + r2[0] },
    repeat: (text, num) => { if (!isNaN(Number(num)) && num !== undefined) return text.repeat(functions.limit(Number(num), 0, 500)); else return ''; },
    limit: (number, min = 0, max = 4294967296) => { return number < min ? min : number > max ? max : number; },
    unurban: (str, remove) => { return str.replace(/\[/g, remove ? '' : '__').replace(/\]/g, remove ? '' : '__') },
    fetchURL: async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    },
    rng: (min, max) => { return min + Math.floor(Math.random() * ((max + 1) - min)) },
    root: (x, n) => { return (((x > 1 || x < -1) && n == 0) ? Infinity : ((x > 0 || x < 0) && n == 0) ? 1 : (x < 0 && n % 2 == 0) ? `${((x < 0 ? -x : x) ** (1 / n))}${"i"}` : (n == 3 && x < 0) ? -Math.cbrt(-x) : (x < 0) ? -((x < 0 ? -x : x) ** (1 / n)) : (n == 3 && x > 0 ? Math.cbrt(x) : (x < 0 ? -x : x) ** (1 / n))); },
    bitwise: (operator, nums, binary) => {
        // tau can you try and make this work
        return 'under development!';
    },
    decimalToBinary: (num) => { return (num >>> 0).toString(2) },
    binaryToDecimal: (num) => { return parseInt(num, 2) },
    ellipsify: (str, max) => { return str.length > max ? str.substring(0, max - 3) + '...' : str },
};
module.exports = functions;